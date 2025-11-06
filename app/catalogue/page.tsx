'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FiShoppingCart, FiFilter, FiX, FiPlus, FiMinus } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

interface Product {
  id: string
  name: string
  price: number
  category: string
  description: string
  image: string // Path to local image in /public or an emoji fallback
  alt?: string
  colors?: string[] // Palette de couleurs disponibles
}

const products: Product[] = [
  {
    id: '1',
    name: 'Électronique Industrielle Premium',
    price: 450,
    category: 'Électronique',
    description: 'Composants électroniques haute qualité pour applications industrielles. Ces composants sont testés et certifiés pour une utilisation en environnement industriel exigeant. Résistance aux températures extrêmes, protection contre les surtensions et garantie de performance optimale.',
    image: '/images/products/electronique-1.jpg',
    alt: "Électronique Industrielle",
    colors: ['#1E40AF', '#DC2626', '#059669', '#7C3AED', '#F59E0B'],
  },
  {
    id: '2',
    name: 'Textile Premium Coton Bio',
    price: 320,
    category: 'Textile',
    description: 'Tissus en coton biologique de première qualité. Certifié GOTS (Global Organic Textile Standard), ce textile est doux, respirant et durable. Idéal pour la confection de vêtements écoresponsables et de qualité supérieure.',
    image: '/images/products/textile-1.jpg',
    alt: 'Textile Premium',
    colors: ['#F3F4F6', '#FEF3C7', '#DBEAFE', '#FCE7F3', '#D1FAE5'],
  },
  {
    id: '3',
    name: 'Matériaux de Construction',
    price: 680,
    category: 'Construction',
    description: 'Matériaux résistants pour construction durable. Conformes aux normes européennes de construction, ces matériaux offrent une excellente isolation thermique et acoustique. Garantie 10 ans sur la qualité et la durabilité.',
    image: '/images/products/construction-1.jpg',
    alt: 'Matériaux de Construction',
    colors: ['#78716C', '#57534E', '#44403C', '#292524', '#1C1917'],
  },
  {
    id: '4',
    name: 'Équipements Médicaux',
    price: 1200,
    category: 'Médical',
    description: 'Équipements médicaux certifiés CE. Conformes aux normes de sécurité médicale européennes, ces équipements sont stérilisables et adaptés aux environnements hospitaliers. Maintenance et calibration incluses.',
    image: '/images/products/medical-1.jpg',
    alt: 'Équipements Médicaux',
    colors: ['#FFFFFF', '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF'],
  },
  {
    id: '5',
    name: 'Produits Cosmétiques',
    price: 150,
    category: 'Cosmétique',
    description: 'Produits cosmétiques naturels et bio. Formulés sans parabènes, sans sulfates et sans parfums synthétiques. Testés dermatologiquement et certifiés bio. Respectueux de la peau et de l\'environnement.',
    image: '/images/products/cosmetique-1.jpg',
    alt: 'Produits Cosmétiques',
    colors: ['#FBBF24', '#F472B6', '#A78BFA', '#60A5FA', '#34D399'],
  },
  {
    id: '6',
    name: 'Mobilier Moderne',
    price: 890,
    category: 'Mobilier',
    description: 'Mobilier design contemporain fabriqué avec des matériaux durables. Design épuré et fonctionnel, parfait pour les espaces modernes. Assemblage facile avec instructions détaillées incluses. Garantie constructeur 2 ans.',
    image: '/images/products/mobilier-1.jpg',
    alt: 'Mobilier Moderne',
    colors: ['#92400E', '#78350F', '#713F12', '#422006', '#1C1917'],
  },
  {
    id: '7',
    name: 'Outils Professionnels',
    price: 280,
    category: 'Outillage',
    description: 'Outils professionnels haute performance. Fabriqués avec des matériaux de qualité supérieure pour une durabilité exceptionnelle. Garantie à vie sur les défauts de fabrication. Étui de rangement inclus.',
    image: '/images/products/outillage-1.jpg',
    alt: 'Outils Professionnels',
    colors: ['#DC2626', '#1F2937', '#F59E0B', '#6B7280', '#FFFFFF'],
  },
  {
    id: '8',
    name: 'Produits Alimentaires Bio',
    price: 95,
    category: 'Alimentaire',
    description: 'Produits alimentaires biologiques certifiés. Certifiés AB (Agriculture Biologique) et sans OGM. Produits frais, de saison et issus de producteurs locaux engagés. Emballage recyclable et écologique.',
    image: '/images/products/alimentaire-1.jpg',
    alt: 'Produits Alimentaires Bio',
    colors: ['#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B'],
  },
]

const categories = ['Tous', 'Électronique', 'Textile', 'Construction', 'Médical', 'Cosmétique', 'Mobilier', 'Outillage', 'Alimentaire']

export default function Catalogue() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Tous' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product)
    setSelectedColor(product.colors?.[0] || '')
    setQuantity(1)
  }

  const handleCloseDetails = () => {
    setSelectedProduct(null)
    setSelectedColor('')
    setQuantity(1)
  }

  const handleAddToCartFromModal = () => {
    if (selectedProduct) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          image: selectedProduct.image,
        })
      }
      handleCloseDetails()
    }
  }

  // Fermer la modal avec la touche Échap
  useEffect(() => {
    if (!selectedProduct) return
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseDetails()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [selectedProduct])

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Catalogue Produits</h1>
          <p className="text-sm text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} disponible{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Search and Filter - Compact */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-3 mb-3">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FiFilter className="w-4 h-4" />
              <span className="font-medium">Filtres</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 overflow-hidden"
            >
              <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                {product.image.startsWith('/') ? (
                  <Image
                    src={product.image}
                    alt={product.alt || product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {product.image}
                  </div>
                )}
                <div className="absolute top-2 left-2 inline-flex items-center rounded-md bg-white/95 backdrop-blur-sm px-2 py-0.5 text-xs font-medium text-gray-700 border border-gray-200/50">
                  {product.category}
                </div>
                <div className="absolute bottom-2 right-2 rounded-md bg-blue-600 text-white text-xs font-bold px-2 py-1 shadow-sm">
                  {product.price}€
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-1">{product.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2 mb-3 leading-relaxed">{product.description}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    <FiShoppingCart className="w-3.5 h-3.5" />
                    Panier
                  </button>
                  <button
                    onClick={() => handleOpenDetails(product)}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    aria-label={`Voir détails pour ${product.name}`}
                  >
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">Aucun produit trouvé</p>
          </div>
        )}
      </div>

      {/* Modal Détails Produit */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={handleCloseDetails}
        >
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec bouton fermer */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-900">Détails du produit</h2>
              <button
                onClick={handleCloseDetails}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Fermer"
              >
                <FiX className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Contenu Modal */}
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Image du produit */}
                <div className="relative h-48 md:h-64 rounded-lg overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100">
                  {selectedProduct.image.startsWith('/') ? (
                    <Image
                      src={selectedProduct.image}
                      alt={selectedProduct.alt || selectedProduct.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {selectedProduct.image}
                    </div>
                  )}
                </div>

                {/* Informations du produit */}
                <div className="flex flex-col">
                  <div className="mb-2">
                    <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {selectedProduct.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedProduct.name}
                  </h3>
                  
                  <div className="mb-3">
                    <span className="text-2xl font-bold text-blue-600">
                      {selectedProduct.price}€
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1.5">Description</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>

                  {/* Palette de couleurs */}
                  {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Couleurs disponibles</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProduct.colors.map((color, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedColor(color)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              selectedColor === color
                                ? 'border-blue-600 scale-110 shadow-md ring-1 ring-blue-200'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            style={{ backgroundColor: color }}
                            aria-label={`Sélectionner la couleur ${color}`}
                            title={color}
                          />
                        ))}
                      </div>
                      {selectedColor && (
                        <p className="mt-1.5 text-xs text-gray-600">
                          Couleur: <span className="font-medium">{selectedColor}</span>
                        </p>
                      )}
                    </div>
                  )}

                  {/* Quantité */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Quantité</h4>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <FiMinus className="w-4 h-4 text-gray-600" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-16 text-center text-base font-semibold border border-gray-300 rounded-lg py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <FiPlus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  {/* Bouton Ajouter au panier */}
                  <button
                    onClick={handleAddToCartFromModal}
                    className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                  >
                    <FiShoppingCart className="w-4 h-4" />
                    Ajouter au panier ({quantity})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

