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
  const [lastProduct, setLastProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('http://localhost:3000/user/users');
        setTotalUsers(usersResponse.data.count || 0);
        setUsers(usersResponse.data.users || []);

        const productsResponse = await axios.get('http://localhost:3000/products');
        setTotalProducts(productsResponse.data.count || 0);
        setProducts(productsResponse.data.products || []);

        if (productsResponse.data.products && productsResponse.data.products.length > 0) {
          setLastProduct(productsResponse.data.products[0]);
        }

        const categoryCounts = productsResponse.data.products.reduce((acc, product) => {
          acc[product.category] = (acc[product.category] || 0) + 1;
          return acc;
        }, {});

        setTotalCategories(Object.keys(categoryCounts).length);
      } catch (error) {
        console.error('Error fetching data from API', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/background_image-NWjEh7azEmeXl1KQl9nrXn9kGQkZ4w.jpg')" }}>
      <div className="min-h-screen  p-8 font-sans">
        <style jsx global>{`
          .shadow-text {
            text-shadow: 0px 0px 5px rgb(170, 0, 255);
          }
        `}</style>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-10 text-center text-white shadow-text">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardHeader>
                <CardTitle>Total de productos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{totalProducts}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total de usuarios</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{totalUsers}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total de categorías</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-5xl font-bold">{totalCategories}</p>
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
                <CardTitle>Categorías y total de productos</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside">
                  {Object.entries(products.reduce((acc, product) => {
                    acc[product.category] = (acc[product.category] || 0) + 1;
                    return acc;
                  }, {})).map(([category, count]) => (
                    <li key={category}>{category}: {count} productos</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card className="mb-10">
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