import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Package, Store, ArrowRight, Check, Zap, BarChart, CreditCard, ShoppingCart, Box } from 'lucide-react';
import { Navbar } from '../pages/navbar';

const Index = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none">
                  Consignment Management <span className="text-primary">Simplified</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
                  The all-in-one platform connecting consignees and stores with powerful inventory management tools.
                </p>
              </div>
              <div className="flex gap-4">
                <Link to="/signup">
                  <Button size="lg">Get Started</Button>
                </Link>
                <Link to="/features">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Logo Cloud Section */}
        <section className="py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-center text-2xl font-bold mb-12">Trusted by leading brands</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {['Shopify', 'WooCommerce', 'Square', 'Etsy', 'BigCommerce'].map((brand) => (
                <div key={brand} className="flex items-center gap-2 text-muted-foreground">
                  <Box className="h-6 w-6" />
                  <span className="font-medium">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-24" id="features">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Powerful Features</h2>
              <p className="mt-4 text-muted-foreground">
                Everything you need to manage your consignment business efficiently
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: <BarChart className="h-8 w-8" />, title: "Real-time Analytics", desc: "Track sales performance in real-time" },
                { icon: <CreditCard className="h-8 w-8" />, title: "Automated Payments", desc: "Seamless payment processing" },
                { icon: <ShoppingCart className="h-8 w-8" />, title: "Inventory Sync", desc: "Sync across multiple platforms" },
                { icon: <Zap className="h-8 w-8" />, title: "Smart Alerts", desc: "Get notified for important events" },
                { icon: <Package className="h-8 w-8" />, title: "Product Management", desc: "Easily manage consigned items" },
                { icon: <Store className="h-8 w-8" />, title: "Multi-store Support", desc: "Manage multiple locations" },
              ].map((feature, index) => (
                <div key={index} className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl rounded-xl bg-primary p-8 text-primary-foreground shadow-lg">
              <div className="flex flex-col items-center text-center">
                <h2 className="text-3xl font-bold">Ready to Transform Your Consignment Business?</h2>
                <p className="mt-4 max-w-[600px]">
                  Join hundreds of businesses already using ConsignConnect to streamline their operations.
                </p>
                <Link to="/signup" className="mt-8">
                  <Button size="lg" variant="secondary">
                    Start Free Trial
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-12 md:py-24" id="blog">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">From Our Blog</h2>
              <p className="mt-4 text-muted-foreground">
                Latest insights on consignment business management
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Maximizing Consignment Profits", desc: "Strategies to increase your revenue" },
                { title: "Inventory Management Tips", desc: "Best practices for consignment stores" },
                { title: "The Future of Retail Consignment", desc: "Trends shaping the industry" },
              ].map((post, index) => (
                <div key={index} className="group overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md">
                  <div className="bg-muted/50 p-6">
                    <h3 className="text-xl font-semibold group-hover:text-primary">{post.title}</h3>
                    <p className="mt-2 text-muted-foreground">{post.desc}</p>
                    <Button variant="link" className="mt-4 px-0">
                      Read More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="py-12 md:py-24 bg-muted/50" id="integrations">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Seamless Integrations</h2>
              <p className="mt-4 text-muted-foreground">
                Connect with the tools you already use
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {['Shopify', 'QuickBooks', 'Stripe', 'Square', 'WooCommerce', 'Xero', 'Etsy', 'PayPal'].map((integration) => (
                <div key={integration} className="flex flex-col items-center gap-4 rounded-lg border bg-card p-6 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Box className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium">{integration}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-12">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="col-span-2">
              <h3 className="text-lg font-semibold">ConsignConnect</h3>
              <p className="mt-4 text-sm text-muted-foreground">
                The modern platform for consignment business management.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="mt-4 space-y-2">
                {['Features', 'Integrations', 'Pricing', 'Changelog'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="mt-4 space-y-2">
                {['Blog', 'Documentation', 'Guides', 'Support'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="mt-4 space-y-2">
                {['About', 'Contact', 'Careers', 'Privacy'].map((item) => (
                  <li key={item}>
                    <Link to={`/${item.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-primary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ConsignConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
