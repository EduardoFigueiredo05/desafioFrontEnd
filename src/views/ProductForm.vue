<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../services/api';

const router = useRouter(); // Para navegar entre as telas
const route = useRoute();   // Para ler parâmetros da URL (ex: o ID do produto)

// Objeto produto 
const product = ref({
  name: '',
  brand: '',
  description: '',
  price: 0,
  stock: 0
});

const isEditing = ref(false);

// Função para buscar o produto caso seja uma edição
const fetchProduct = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    product.value = response.data;
  } catch (error) {
    alert("Erro ao carregar os dados do produto.");
    router.push('/');
  }
};

// Descobre se estamos criando ou editando logo que a tela abre
onMounted(() => {
  if (route.params.id) {
    isEditing.value = true;
    fetchProduct(route.params.id);
  }
});

// Salvando com validação e mensagem de sucesso/erro
const saveProduct = async () => {
  try {
    if (isEditing.value) {
      await api.put(`/products/${route.params.id}`, product.value);
      alert("Produto atualizado com sucesso!");
    } else {
      await api.post('/products', product.value);
      alert("Produto cadastrado com sucesso!");
    }
    router.push('/'); // Volta para a tela inicial após salvar
  } catch (error) {
    console.error("Erro ao salvar:", error);
    alert("Erro ao salvar o produto. Verifique os dados.");
  }
};

const cancel = () => {
  router.push('/');
};
</script>

<!-- HTML -->
<template>
  <div class="container">
    <div class="header">
      <h2>{{ isEditing ? 'Editar Produto' : 'Novo Produto' }}</h2>
    </div>

    <form @submit.prevent="saveProduct" class="form-card">
      <div class="form-group">
        <label>Nome do Produto:</label>
        <input type="text" v-model="product.name" required placeholder="Ex: Notebook Samsung Galaxy" class="form-control" />
      </div>

      <div class="form-group">
        <label>Marca:</label>
        <input type="text" v-model="product.brand" required placeholder="Ex: Samsung" class="form-control" />
      </div>

      <div class="form-group">
        <label>Descrição:</label>
        <textarea v-model="product.description" rows="3" placeholder="Detalhes do produto..." class="form-control"></textarea>
      </div>

      <div class="form-row">
        <div class="form-group half">
          <label>Preço (R$):</label>
          <input type="number" v-model="product.price" step="0.01" min="0" required class="form-control" />
        </div>

        <div class="form-group half">
          <label>Estoque (Un.):</label>
          <input type="number" v-model="product.stock" min="0" required class="form-control" />
        </div>
      </div>

      <div class="actions">
        <button type="button" @click="cancel" class="btn btn-secondary">Cancelar</button>
        <button type="submit" class="btn btn-primary">Salvar Produto</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.container { max-width: 600px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.header { margin-bottom: 20px; text-align: center; }
.form-card { background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.form-group { margin-bottom: 15px; }
.form-row { display: flex; gap: 15px; }
.half { flex: 1; }
label { display: block; font-weight: bold; margin-bottom: 5px; color: #333; }
.form-control { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box; }
.actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
.btn { padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
.btn-primary { background-color: #4CAF50; color: white; }
.btn-secondary { background-color: #9e9e9e; color: white; }
</style>