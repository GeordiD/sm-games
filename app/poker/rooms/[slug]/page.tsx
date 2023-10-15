async function getData(id: string) {
  const response = await fetch(
    `${process.env.URL}/api/rooms/${id}`,
    {
      method: 'GET'
    }
  );

  if (response.status === 404) {
    return null;
  } else {
    return await response.json();
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);

  // No room found
  if (!data) {
    return (
      <div>
        No room found.
      </div>
    )
  }

  return (
    <main className="flex flex-col min-h-screen">
      <p>
        {JSON.stringify(data, undefined, 2)}
      </p>
    </main>
  )
}