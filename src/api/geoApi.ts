export async function reverseGeocodeCity(
    lat: number,
    lon: number
): Promise<string | null> {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
            {
                headers: {
                    "Accept": "application/json",
                },
            }
        );

        if (!res.ok) return null;

        const data = await res.json();

        return (
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            null
        );
    } catch {
        return null;
    }
}
