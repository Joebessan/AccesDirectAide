import { BookOpen, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const blogPosts = [
  {
    id: 1,
    title: "Les nouvelles aides au logement en 2025",
    excerpt: "Découvrez les changements majeurs concernant l'APL, l'ALS et l'ALF cette année. Un guide complet pour comprendre vos droits et maximiser vos allocations logement.",
    category: "Logement",
    date: "28 Jan 2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
    featured: true
  },
  {
    id: 2,
    title: "Prime d'activité : êtes-vous éligible ?",
    excerpt: "La prime d'activité concerne plus de personnes qu'on ne le pense. Vérifiez si vous pouvez en bénéficier avec notre guide complet.",
    category: "Aides financières",
    date: "25 Jan 2025",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    featured: false
  },
  {
    id: 3,
    title: "Comment bien préparer son dossier RSA",
    excerpt: "Tous nos conseils pour constituer un dossier RSA complet et éviter les allers-retours avec la CAF.",
    category: "Conseils",
    date: "22 Jan 2025",
    readTime: "6 min",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    featured: false
  },
  {
    id: 4,
    title: "CMU-C : tout savoir sur la couverture santé gratuite",
    excerpt: "La CMU-C permet d'accéder aux soins gratuitement. Découvrez les conditions d'éligibilité et comment faire votre demande.",
    category: "Santé",
    date: "18 Jan 2025",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    featured: false
  },
  {
    id: 5,
    title: "Allocations familiales : les montants 2025",
    excerpt: "Les montants des allocations familiales ont été revalorisés. Découvrez les nouveaux barèmes et vérifiez vos droits.",
    category: "Famille",
    date: "15 Jan 2025",
    readTime: "4 min",
    image: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=600&h=400&fit=crop",
    featured: false
  },
  {
    id: 6,
    title: "Aide au permis de conduire : comment en bénéficier ?",
    excerpt: "Plusieurs dispositifs existent pour financer votre permis de conduire. On vous explique tout.",
    category: "Emploi",
    date: "10 Jan 2025",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&h=400&fit=crop",
    featured: false
  }
];

const categories = ["Tous", "Logement", "Aides financières", "Santé", "Famille", "Emploi", "Conseils"];

export default function BlogPage() {
  const featuredPost = blogPosts.find(post => post.featured);
  const otherPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0 gradient-mesh-subtle" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Blog AccesDirectAide</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Actualités & <span className="text-gradient">Conseils</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Guides pratiques, actualités et informations pour vous aider dans vos démarches administratives.
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input 
                  placeholder="Rechercher un article..." 
                  className="pl-12 h-12 rounded-xl"
                  data-testid="input-search-blog"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Button 
                  key={category}
                  variant={category === "Tous" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  data-testid={`button-category-${category.toLowerCase().replace(" ", "-")}`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {category}
                </Button>
              ))}
            </div>

            {featuredPost && (
              <Card className="mb-12 overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge>À la une</Badge>
                      <Badge variant="secondary">{featuredPost.category}</Badge>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {featuredPost.readTime} de lecture • {featuredPost.date}
                      </span>
                      <Button className="gap-2" data-testid="button-read-featured">
                        Lire l'article
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="overflow-hidden group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="line-clamp-2 mb-4">{post.excerpt}</CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                      <Button variant="ghost" size="sm" className="gap-1" data-testid={`button-read-${post.id}`}>
                        Lire
                        <ArrowRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="gap-2" data-testid="button-load-more">
                Charger plus d'articles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
