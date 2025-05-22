"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  images: string[]
  title: string
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Image src={images[selectedImage] || "/placeholder.svg"} alt={title} fill className="object-cover" priority />
      </div>

      <div className="flex space-x-2 rtl:space-x-reverse overflow-auto pb-1">
        {images.map((image, index) => (
          <button
            key={index}
            className={cn(
              "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-muted",
              selectedImage === index && "ring-2 ring-primary",
            )}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - تصویر ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
