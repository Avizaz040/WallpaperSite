import { connectDB } from '@/utils/db';
import mongoose from 'mongoose';

const WallpaperSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
});

const Wallpaper = mongoose.models.Wallpaper || mongoose.model('Wallpaper', WallpaperSchema);

export async function GET() {
  await connectDB();
  const wallpapers = await Wallpaper.find();
  return Response.json(wallpapers);
}

export async function POST(request) {
  await connectDB();
  const data = await request.json();
  const newWallpaper = await Wallpaper.create(data);
  return Response.json(newWallpaper, { status: 201 });
}
