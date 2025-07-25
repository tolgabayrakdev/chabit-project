import React from 'react';
// @ts-expect-error qrcode modülü için types yok
import QRCodeLib from 'qrcode';

interface QrPreviewProps {
    value: string;
    size?: number;
    style?: string;
    darkColor?: string;
    lightColor?: string;
    logoUrl?: string | null;
}

export function QrPreview({ value, size = 180, style = 'square', darkColor = '#000000', lightColor = '#ffffff', logoUrl }: QrPreviewProps) {
    const [modules, setModules] = React.useState<any>(null);
    React.useEffect(() => {
        let cancelled = false;
        async function generate() {
            try {
                const qr = await QRCodeLib.create(value, { errorCorrectionLevel: 'H' });
                if (!cancelled) setModules(qr.modules);
            } catch (err) {
                if (!cancelled) setModules(null);
            }
        }
        generate();
        return () => { cancelled = true; };
    }, [value]);

    if (!modules) return <div style={{ width: size, height: size, background: lightColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Yükleniyor...</div>;
    const moduleCount = modules.size;
    const moduleSize = size / moduleCount;

    const isInMarkerArea = (x: number, y: number) => {
        const inTopLeft = x < 7 && y < 7;
        const inTopRight = x >= moduleCount - 7 && y < 7;
        const inBottomLeft = x < 7 && y >= moduleCount - 7;
        return inTopLeft || inTopRight || inBottomLeft;
    };

    const drawModule = (x: number, y: number) => {
        const px = x * moduleSize;
        const py = y * moduleSize;
        switch (style) {
            case 'dot':
                return <circle key={x + '-' + y} cx={px + moduleSize / 2} cy={py + moduleSize / 2} r={moduleSize * 0.4} fill={darkColor} />;
            case 'diamond':
                return <polygon key={x + '-' + y} points={`
                    ${px + moduleSize / 2},${py}
                    ${px + moduleSize},${py + moduleSize / 2}
                    ${px + moduleSize / 2},${py + moduleSize}
                    ${px},${py + moduleSize / 2}
                `} fill={darkColor} />;
            case 'triangle':
                return <polygon key={x + '-' + y} points={`
                    ${px + moduleSize / 2},${py}
                    ${px + moduleSize},${py + moduleSize}
                    ${px},${py + moduleSize}
                `} fill={darkColor} />;
            case 'rounded':
                return <rect key={x + '-' + y} x={px} y={py} width={moduleSize} height={moduleSize} rx={moduleSize * 0.3} fill={darkColor} />;
            default:
                return <rect key={x + '-' + y} x={px} y={py} width={moduleSize} height={moduleSize} fill={darkColor} />;
        }
    };

    const modulesSvg = [];
    for (let y = 0; y < moduleCount; y++) {
        for (let x = 0; x < moduleCount; x++) {
            if (modules.get(x, y)) {
                if (isInMarkerArea(x, y)) {
                    const px = x * moduleSize;
                    const py = y * moduleSize;
                    modulesSvg.push(<rect key={'m-' + x + '-' + y} x={px} y={py} width={moduleSize} height={moduleSize} fill={darkColor} />);
                } else {
                    modulesSvg.push(drawModule(x, y));
                }
            }
        }
    }

    let logoElem = null;
    if (logoUrl) {
        const logoSize = size * 0.2;
        logoElem = <image href={logoUrl} x={(size - logoSize) / 2} y={(size - logoSize) / 2} width={logoSize} height={logoSize} style={{ borderRadius: 12, background: '#fff' }} />;
    }

    return (
        <svg width={size} height={size} style={{ background: lightColor, borderRadius: 16, boxShadow: '0 2px 8px #0001' }}>
            {modulesSvg}
            {logoElem}
        </svg>
    );
} 