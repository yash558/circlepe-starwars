import CharacterList from "@/components/character/characterList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-gray-900 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <Image src="/logo.png" alt="Star Wars Logo" className="w-48 md:w-64 mb-8" height={500} width={500} />
        </div>
        <CharacterList />
      </div>
    </main>
  );
}
