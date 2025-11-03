const tableName = 'product_c';

export const productService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "imageUrl_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "specifications_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "ASC"}]
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database field names to UI expected field names for compatibility
      return response.data.map(product => ({
        ...product,
        name: product.name_c,
        price: product.price_c,
        category: product.category_c,
        description: product.description_c,
        imageUrl: product.imageUrl_c,
        inStock: product.in_stock_c,
        specifications: product.specifications_c ? JSON.parse(product.specifications_c) : {}
      }));
    } catch (error) {
      console.error("Error fetching products:", error?.response?.data?.message || error);
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "imageUrl_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "specifications_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, id, params);
      
      if (!response.success || !response.data) {
        throw new Error("Product not found");
      }
      
      const product = response.data;
      // Map database field names to UI expected field names for compatibility
      return {
        ...product,
        name: product.name_c,
        price: product.price_c,
        category: product.category_c,
        description: product.description_c,
        imageUrl: product.imageUrl_c,
        inStock: product.in_stock_c,
        specifications: product.specifications_c ? JSON.parse(product.specifications_c) : {}
      };
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error?.response?.data?.message || error);
      throw new Error("Product not found");
    }
  },

  async getByCategory(category) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "price_c"}},
          {"field": {"Name": "category_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "imageUrl_c"}},
          {"field": {"Name": "in_stock_c"}},
          {"field": {"Name": "specifications_c"}}
        ],
        where: [{"FieldName": "category_c", "Operator": "EqualTo", "Values": [category]}],
        orderBy: [{"fieldName": "Id", "sorttype": "ASC"}]
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database field names to UI expected field names for compatibility
      return response.data.map(product => ({
        ...product,
        name: product.name_c,
        price: product.price_c,
        category: product.category_c,
        description: product.description_c,
        imageUrl: product.imageUrl_c,
        inStock: product.in_stock_c,
        specifications: product.specifications_c ? JSON.parse(product.specifications_c) : {}
      }));
    } catch (error) {
      console.error("Error fetching products by category:", error?.response?.data?.message || error);
      return [];
    }
  },

  async create(productData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI field names to database field names
      const params = {
        records: [{
          name_c: productData.name,
          price_c: productData.price,
          category_c: productData.category,
          description_c: productData.description,
          imageUrl_c: productData.imageUrl,
          in_stock_c: productData.inStock,
          specifications_c: productData.specifications ? JSON.stringify(productData.specifications) : ""
        }]
      };
      
      const response = await apperClient.createRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const created = response.results[0];
        if (created.success && created.data) {
          const product = created.data;
          return {
            ...product,
            name: product.name_c,
            price: product.price_c,
            category: product.category_c,
            description: product.description_c,
            imageUrl: product.imageUrl_c,
            inStock: product.in_stock_c,
            specifications: product.specifications_c ? JSON.parse(product.specifications_c) : {}
          };
        }
      }
      
      throw new Error("Failed to create product");
    } catch (error) {
      console.error("Error creating product:", error?.response?.data?.message || error);
      throw new Error("Failed to create product");
    }
  },

  async update(id, productData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI field names to database field names, only include provided fields
      const updateFields = { Id: id };
      if (productData.name !== undefined) updateFields.name_c = productData.name;
      if (productData.price !== undefined) updateFields.price_c = productData.price;
      if (productData.category !== undefined) updateFields.category_c = productData.category;
      if (productData.description !== undefined) updateFields.description_c = productData.description;
      if (productData.imageUrl !== undefined) updateFields.imageUrl_c = productData.imageUrl;
      if (productData.inStock !== undefined) updateFields.in_stock_c = productData.inStock;
      if (productData.specifications !== undefined) updateFields.specifications_c = JSON.stringify(productData.specifications);
      
      const params = {
        records: [updateFields]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const updated = response.results[0];
        if (updated.success && updated.data) {
          const product = updated.data;
          return {
            ...product,
            name: product.name_c,
            price: product.price_c,
            category: product.category_c,
            description: product.description_c,
            imageUrl: product.imageUrl_c,
            inStock: product.in_stock_c,
            specifications: product.specifications_c ? JSON.parse(product.specifications_c) : {}
          };
        }
      }
      
      throw new Error("Failed to update product");
    } catch (error) {
      console.error("Error updating product:", error?.response?.data?.message || error);
      throw new Error("Failed to update product");
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = { 
        RecordIds: [id]
      };
      
      const response = await apperClient.deleteRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return false;
      }
      
      if (response.results && response.results.length > 0) {
        return response.results[0].success;
      }
      
      return false;
    } catch (error) {
      console.error("Error deleting product:", error?.response?.data?.message || error);
      return false;
}
  }
};