import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Styled Card components
const Card = ({ className, children }) => (
  <div className={`rounded-lg p-6 bg-black bg-opacity-75 border border-[rgb(150,0,250)] ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => <div className="mb-4">{children}</div>;
const CardTitle = ({ children }) => <h2 className="text-2xl font-bold text-white shadow-text">{children}</h2>;
const CardContent = ({ children }) => <div className="text-white">{children}</div>;

// Styled Table components
const Table = ({ children }) => <table className="w-full">{children}</table>;
const TableHeader = ({ children }) => <thead className="border-b border-[rgb(0,200,255)]">{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children }) => <tr className="border-b border-[rgb(0,200,255)] bg-black bg-opacity-0">{children}</tr>;
const TableHead = ({ children }) => <th className="text-left p-3 text-white shadow-text">{children}</th>;
const TableCell = ({ children }) => <td className="p-3 text-white">{children}</td>;

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalSales, setTotalSales] = useState(0); // Total de productos vendidos
  const [lastUser, setLastUser] = useState({}); // Último usuario creado
  const [lastProduct, setLastProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [lastFiveProducts, setLastFiveProducts] = useState([]); // Últimos 5 productos vendidos
  const [categoryCounts, setCategoryCounts] = useState({}); // Conteos de categorías

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:3000/user/users');
        setTotalUsers(usersResponse.data.count || 0);
        setUsers(usersResponse.data.users || []);
        if (usersResponse.data.users.length > 0) {
          setLastUser(usersResponse.data.users[usersResponse.data.users.length - 1]); // Último usuario
        }

        const productsResponse = await axios.get('http://localhost:3000/products');
        setTotalProducts(productsResponse.data.count || 0);
        setProducts(productsResponse.data.products || []);
        
        if (productsResponse.data.products && productsResponse.data.products.length > 0) {
          setLastProduct(productsResponse.data.products[0]); // Último producto creado
        }

        // Obtener total de productos vendidos (esto depende de tu estructura de datos)
        const totalSold = productsResponse.data.products.reduce((acc, product) => acc + (product.sales || 0), 0);
        setTotalSales(totalSold);

        // Obtener los últimos 5 productos vendidos
        const soldProducts = productsResponse.data.products
          .sort((a, b) => b.sales - a.sales)
          .slice(0, 5);
        setLastFiveProducts(soldProducts);

        // Contar categorías
        const categoryCounts = productsResponse.data.products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});
        setCategoryCounts(categoryCounts);
        setTotalCategories(Object.keys(categoryCounts).length);

      } catch (error) {
        console.error('Error fetching data from API', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background_image-NWjEh7azEmeXl1KQl9nrXn9kGQkZ4w.jpg')" }}>
      <div className="min-h-screen p-8 font-sans">
        <style jsx global>{`
          .shadow-text {
            text-shadow: 0px 0px 5px rgb(170, 0, 255);
          }
        `}</style>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-3 text-center text-white shadow-text">Game Store 507</h1>
          <h2 className="text-3xl font-bold mb-10 text-center text-white shadow-text">Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Total de productos:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{totalProducts}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total de usuarios:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{totalUsers}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total de categorías:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{totalCategories}</p>
              </CardContent>
            </Card>
          </div>
          <div className="mb-10"> {/* Espacio entre la tabla de categorías y la lista de productos */}
            <Card>
              <CardHeader>
                <CardTitle>Total de productos vendidos:</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{totalSales > 0 ? totalSales : 'Por ahora no se han vendido productos.'}</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Último producto creado</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>Nombre: {lastProduct.name || 'N/A'}</li>
                  <li>Categoría: {lastProduct.category || 'N/A'}</li>
                  <li>Precio: ${lastProduct.price || 'N/A'}</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Último usuario creado</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  <li>Nombre: {lastUser.name || 'N/A'}</li>
                  <li>Email: {lastUser.email || 'N/A'}</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Últimos 5 productos vendidos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {lastFiveProducts.length > 0 ? (
                    lastFiveProducts.map(product => (
                      <li key={product.id}>{product.name}: {product.sales || 0} vendidos</li>
                    ))
                  ) : (
                    <li>No se han vendido productos.</li>
                  )}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Categorías y totales de productos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {Object.entries(categoryCounts).map(([category, count]) => (
                    <li key={category}>{category}: {count} productos</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <div className="mb-10"> {/* Espacio adicional entre las tablas */}
          <Card>
            <CardHeader>
              <CardTitle>Listado de productos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length > 0 ? (
                    products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>{product.stock}</TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan="5">No hay productos disponibles</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          </div>
         
            <Card>
              <CardHeader>
                <CardTitle>Listado de usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Id</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.length > 0 ? (
                      users.map((user) => (
                        <TableRow key={user.user_id}>
                          <TableCell>{user.user_id}</TableCell>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="3">No hay usuarios disponibles</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          
        </div>
      </div>
    </div>
  );
}
