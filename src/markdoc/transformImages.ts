// src/lib/transformImages.ts
export function transformImageUrls(content: string, country: string): string {
    // Transformer toutes les images markdown et HTML
    return content
        // Images markdown: ![alt](/images/...)
        .replace(/!\[([^\]]*)\]\(\/images\/([^)]+)\)/g, `![$1](/images/${country}/$2)`)
        // Images HTML: <img src="/images/..." />
        .replace(/(<img[^>]*src=["'])\/images\/([^"']+)(["'][^>]*>)/g, `$1/images/${country}/$2$3`)
        // Images avec balises figure
        .replace(/(<figure[^>]*src=["'])\/images\/([^"']+)(["'][^>]*>)/g, `$1/images/${country}/$2$3`)
}