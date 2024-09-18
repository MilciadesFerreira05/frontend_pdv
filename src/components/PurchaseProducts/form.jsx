import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { SearchIcon, DeleteIcon } from "../ui/icons"; // Asumiendo que tienes un icono de basura
import Select from "react-select";
import ProductService from "../../services/ProductService";
import SupplierService from "./../../services/SupplierService";

const Form = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const result = await SupplierService.getAllSuppliers();
        setSuppliers(result.content);
      } catch (error) {
        console.error("Error fetching suppliers:", error);
      }
    };

    fetchSuppliers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ProductService.searchProducts({ q: searchQuery });
        setSearchResults(result.content);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (searchQuery) {
      fetchProducts();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleProductSelect = (product) => {
    setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, { ...product, quantity: 1 }]);
    setSearchQuery("");
    setSearchResults([]);
    updateTotal();
  };

  const handleProductChange = (event, index, field) => {
    const newProducts = [...selectedProducts];
    newProducts[index] = { ...newProducts[index], [field]: event.target.value };
    setSelectedProducts(newProducts);
    updateTotal();
  };

  const handleRemoveProduct = (index) => {
    const newProducts = [...selectedProducts];
    newProducts.splice(index, 1);
    setSelectedProducts(newProducts);
    updateTotal();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const updateTotal = () => {
    const newTotal = selectedProducts.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
    setTotal(newTotal);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const purchase = {
      date: formData.get("date"),
      supplier: selectedSupplier,
      invoice: formData.get("invoice"),
      products: selectedProducts.map((p) => ({
        ...p,
        quantity: Number(p.quantity),
        price: Number(p.price),
        subtotal: p.quantity * p.price,
      })),
    };

    // Handle form submission logic here
    console.log("Purchase data:", purchase);
  };

  return (
    <Card className="w-full max-w-[100%]">
      <CardHeader>
        <CardTitle>Compra de productos</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Fecha</Label>
              <Input
                id="date"
                name="date"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="supplier">Proveedor</Label>
              <Select
                id="supplier"
                options={suppliers.map((s) => ({ value: s.id, label: s.name }))}
                onChange={(selectedOption) => setSelectedSupplier(selectedOption)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="invoice">Nro. de Factura</Label>
              <Input id="invoice" name="invoice" type="text" placeholder="" />
            </div>
          </div>

          <div>
            <div className="flex justify-end mt-4 font-semibold text-red-600 text-xl">
              Total: ${total.toFixed(2)}
            </div>
            <Label className="font-semibold">Productos</Label>
            <p className="text-sm text-muted-foreground">
              Lista de productos comprados
            </p>
            <div className="border rounded-lg mt-2 p-4">
              <div className="relative mb-4">
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  className="w-full rounded-lg bg-background pl-8"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full bg-white border border-gray-200 rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="flex justify-between p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleProductSelect(product)}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-sm text-gray-500 truncate">
                            {product.description}
                          </span>
                        </div>
                        <div className="flex gap-4 mr-2"> {/* Ajuste de margen derecho */}
                          <span className="text-sm text-gray-500">
                            Stock: {product.stock}
                          </span>
                          <span className="text-sm font-semibold">
                            ${product.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2 w-58"></th>
                    <th className="text-center pb-2 w-24">Cantidad</th>
                    <th className="text-center pb-2 w-40">Precio de Compra</th>
                    <th className="text-center pb-2 w-40">Precio de Venta</th>
                    <th className="text-right pb-2 w-40">Subtotal</th>
                    <th className="text-right pb-2 w-20"></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProducts.map((product, index) => (
                    <tr key={product.id} className="border-b">
                      <td className="py-2">
                        <div className="flex items-center gap-3">
                          <img
                            src="/placeholder.svg"
                            alt="Product Image"
                            width={50}
                            height={50}
                            className="rounded-md"
                            style={{ aspectRatio: '50/50', objectFit: 'cover' }}
                          />
                          <div>
                            <h4 className="font-medium">{product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-2">
                        <Input
                          type="number"
                          value={product.quantity}
                          onChange={(e) => handleProductChange(e, index, "quantity")}
                          className="w-52"
                        />
                      </td>
                      <td className="text-right py-2">
                        <Input
                          type="number"
                          value={product.price}
                          onChange={(e) => handleProductChange(e, index, "price")}
                          className="w-52"
                        />
                      </td>
                      <td className="text-right py-2">
                        <Input
                          type="number"
                          value={product.price}
                          className="w-52"
                        />
                      </td>

                      <td className="text-right py-2">
                        {(product.quantity * product.price).toFixed(2)}
                      </td>
                      <td className="text-right py-2">
                        <Button
                          type="button"
                          className="p-1 text-red-600 hover:text-red-800"
                          onClick={() => handleRemoveProduct(index)}
                        >
                          <DeleteIcon className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit">Complete Purchase</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
