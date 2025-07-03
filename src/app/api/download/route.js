export async function GET(request) {
  const imageUrl = request.nextUrl.searchParams.get('url')
  if (!imageUrl) return new Response('Missing URL', { status: 400 })

  const res = await fetch(imageUrl)
  const buffer = await res.arrayBuffer()
  const filename = imageUrl.split('/').pop()

  return new Response(buffer, {
    headers: {
      'Content-Type': res.headers.get('Content-Type'),
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  })
}
