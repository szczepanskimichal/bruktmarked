import { mongooseConnect } from "@/lib/mongoose"; // Importowanie funkcji do nawiązywania połączenia z MongoDB
import { Product } from "@/models/Product"; // Importowanie modelu Produktu
import { User } from "@/models/User"; // Importowanie modelu Użytkownika

// Główna funkcja obsługująca przetwarzanie żądań
export default async function handle(req, res) {
  const { method } = req; // Wyciąganie metody HTTP z żądania

  // Nawiązanie połączenia z bazą danych MongoDB
  await mongooseConnect();

  // Obsługa żądań GET
  if (method === "GET") {
    const { id, userId } = req.query; // Wyciąganie parametrów zapytania z żądania

    // Jeśli podano ID, znajdź i zwróć konkretny produkt
    if (id) {
      const product = await Product.findOne({ _id: id });
      return res.json(product); // Zwracanie znalezionego produktu
    }

    // Jeśli podano userId, znajdź i zwróć produkty powiązane z tym użytkownikiem
    if (userId) {
      const products = await Product.find({ user: userId });
      return res.json(products); // Zwracanie produktów użytkownika
    }

    // Jeśli nie podano żadnych filtrów, zwróć wszystkie produkty
    const products = await Product.find();
    return res.json(products); // Zwracanie wszystkich produktów
  }

  // Obsługa żądań POST do tworzenia nowego produktu
  if (method === "POST") {
    const {
      email, // Email użytkownika
      title, // Tytuł produktu
      description, // Opis produktu
      price, // Cena produktu
      images, // Obrazy produktu
      category, // Kategoria produktu
      color, // Kolor produktu
      size, // Rozmiar produktu
      used, // Wskazuje, czy produkt jest używany
    } = req.body; // Wyciąganie danych z ciała żądania

    // Znajdowanie użytkownika po emailu, aby powiązać produkt z odpowiednim użytkownikiem
    const user = await User.findOne({ email });

    // Tworzenie nowego produktu z podanymi szczegółami i powiązanie go z użytkownikiem
    const product = await Product.create({
      user: user._id, // Powiązanie produktu z ID użytkownika
      title,
      description,
      price,
      images,
      category: category || undefined, // Użycie undefined, jeśli kategoria nie jest podana
      color: color || undefined, // Użycie undefined, jeśli kolor nie jest podany
      size: size || undefined, // Użycie undefined, jeśli rozmiar nie jest podany
      used,
    });
    return res.json(product); // Zwracanie utworzonego produktu
  }

  // Obsługa żądań PUT do aktualizacji istniejącego produktu
  if (method === "PUT") {
    const {
      title,
      description,
      price,
      images,
      category,
      color,
      size,
      used,
      _id, // ID produktu do zaktualizowania
    } = req.body; // Wyciąganie danych z ciała żądania

    // Aktualizacja produktu z podanymi szczegółami
    await Product.updateOne(
      { _id }, // Filtr według ID produktu
      { title, description, price, images, category, color, size, used } // Pola do aktualizacji
    );
    return res.json(true); // Zwracanie odpowiedzi potwierdzającej
  }

  // Obsługa żądań DELETE do usuwania produktu
  if (method === "DELETE") {
    const { id } = req.query; // Wyciąganie ID z parametrów zapytania

    // Jeśli podano ID, usuń wskazany produkt
    if (id) {
      await Product.deleteOne({ _id: id }); // Usuwanie produktu według ID
      return res.json(true); // Zwracanie odpowiedzi potwierdzającej
    }
  }

  // Jeśli metoda nie jest obsługiwana, zwróć błąd 405 Method Not Allowed
  return res.status(405).json({ error: "Method not allowed" });
}
