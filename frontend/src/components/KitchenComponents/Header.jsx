import React from 'react';
import { Utensils } from 'lucide-react';

export default function Header() {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
        <Utensils className="w-8 h-8" />
        Kitchen 
      </h1>
    </header>
  );
}