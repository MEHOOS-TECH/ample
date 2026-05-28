const { data, error } = await supabase.storage
  .from("anime-files")
  .upload(`naruto/episode1.mp4`, file)

const publicUrl =
  supabase.storage
    .from("anime-files")
    .getPublicUrl(data.path).data.publicUrl

await supabase.from("anime").insert({
  title: "Naruto Episode 1",
  video_url: publicUrl,
  category: "Action",
  season: 1
})
