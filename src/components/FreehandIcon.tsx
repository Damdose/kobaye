'use client';

import { useEffect, useState } from 'react';

export type FreehandIconName =
  | 'analytics' | 'arrow-right' | 'at' | 'book' | 'brain' | 'building'
  | 'calculator' | 'calendar' | 'camera' | 'caret-down' | 'chart-bar' | 'chart-line'
  | 'chart-pie' | 'chat' | 'check-badge' | 'check' | 'clock' | 'close'
  | 'coins' | 'copy' | 'crosshair' | 'crown' | 'dollar' | 'download'
  | 'eye' | 'file-text' | 'globe' | 'growth' | 'handshake' | 'image'
  | 'lightning' | 'link' | 'list-checks' | 'list' | 'loader' | 'mail'
  | 'map-pin' | 'map' | 'megaphone' | 'menu' | 'message' | 'minus' | 'network'
  | 'notebook' | 'pencil' | 'phone' | 'plug' | 'plus' | 'search' | 'seo'
  | 'shield' | 'sliders' | 'sparkle' | 'star' | 'store' | 'tag' | 'target'
  | 'task' | 'team' | 'text' | 'trend-up' | 'unlock' | 'user' | 'users'
  | 'video' | 'warning' | 'wrench';

interface FreehandIconProps {
  name: FreehandIconName;
  size?: number;
  className?: string;
  weight?: string;
}

const cache: Record<string, string> = {};

export default function FreehandIcon({ name, size = 24, className = '' }: FreehandIconProps) {
  const [svg, setSvg] = useState(cache[name] || '');

  useEffect(() => {
    if (cache[name]) { setSvg(cache[name]); return; }
    fetch(`/icons/freehand/${name}.svg`)
      .then(r => r.text())
      .then(text => { cache[name] = text; setSvg(text); });
  }, [name]);

  const sized = svg
    .replace(/width="\d+"/, `width="${size}"`)
    .replace(/height="\d+"/, `height="${size}"`);

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: sized }}
    />
  );
}
