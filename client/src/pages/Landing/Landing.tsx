import { Button } from '@/components/ui/button'
import { motion } from 'motion/react'
import { BookmarkIcon, TagIcon, TrashIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { Link } from 'react-router'

const features = [
  {
    icon: BookmarkIcon,
    title: 'Save Links',
    description: 'Store and organize your favorite URLs in one place.'
  },
  {
    icon: TagIcon,
    title: 'Filter by Tags',
    description: 'Quickly find links using tags you define.'
  },
  {
    icon: TrashIcon,
    title: 'Delete Easily',
    description: 'Remove links you no longer need with one click.'
  }
]

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen  text-gray-800 pagePadding">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-4"
        >
          LinkVault
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg max-w-xl mb-6"
        >
          Your personal link manager — save, tag, and manage URLs effortlessly.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg shadow-lg">
            <Link to="/dashboard">
            Get Started
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 max-w-5xl mx-auto grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
          >
            <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </section>
    </div>
  )
}

export default Landing
