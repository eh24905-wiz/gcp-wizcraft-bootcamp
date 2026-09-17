// app/page.tsx
import Header from '../components/Header';
import Hero from '../components/Hero';
import Products from '../components/Products';
import SideCart from '../components/SideCart';
import Chatbot from '../components/Chatbot';
import AboveTheFooter from '../components/AboveTheFooter';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Toys | CISOtopia',
};

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="/styles/header.css" />
      <link rel="stylesheet" href="/styles/side_cart.css" />
      <link rel="stylesheet" href="/styles/product.css" />
      <link rel="stylesheet" href="/styles/toys.css" />
      <link rel="stylesheet" href="/styles/above_the_footer.css" />
      <link rel="stylesheet" href="/styles/footer.css" />
      <Header />
      <Hero />
      <Products type="toys" />
      <SideCart />
      <Chatbot autoOpen={true} />
      <AboveTheFooter />
      <Footer />
    </>
  );
}