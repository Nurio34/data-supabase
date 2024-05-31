export const createImageUrl = (imageUrl: string) => {
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/newImages/${imageUrl}`;
};
