<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';
const router = useRouter();

const products = ref([]);

const fetchProducts = async () => {
  try {
    const response = await api.get('/products');
    products.value = response.data;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    alert("Erro ao conectar com o servidor.");
  }
};

const formatPrice = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

const deleteProduct = async (id) => {
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts(); 
    } catch (error) {
      alert("Erro ao excluir o produto.");
    }
  }
};

onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="container">
    <div class="header">
      <h2>Catálogo de Produtos</h2>
      <button @click="router.push('/product/new')" class="btn btn-primary">Adicionar Novo</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Marca</th>
          <th>Preço</th>
          <th>Estoque</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="products.length === 0">
          <td colspan="6" class="text-center">Nenhum produto cadastrado.</td>
        </tr>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ formatPrice(product.price) }}</td>
          <td>
            <span :class="{'out-of-stock': product.stock === 0, 'low-stock': product.stock > 0 && product.stock <= 5}">
              {{ product.stock }} un.
            </span>
          </td>
          <td>
            <button @click="router.push(`/product/edit/${product.id}`)" class="btn btn-secondary btn-sm">Editar</button>
            <button @click="deleteProduct(product.id)" class="btn btn-danger btn-sm">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container { max-width: 900px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.table th, .table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
.table th { background-color: #f4f4f4; }
.btn { padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer; margin-right: 5px; }
.btn-primary { background-color: #4CAF50; color: white; }
.btn-secondary { background-color: #2196F3; color: white; }
.btn-danger { background-color: #f44336; color: white; }
.text-center { text-align: center; }
.out-of-stock { color: red; font-weight: bold; }
.low-stock { color: darkorange; font-weight: bold; }
</style>