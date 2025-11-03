const tableName = 'order_c';

export const orderService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        fields: [
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "order_date_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "billing_info_c"}}
        ],
        orderBy: [{"fieldName": "Id", "sorttype": "DESC"}]
      };
      
      const response = await apperClient.fetchRecords(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }
      
      // Map database field names to UI expected field names for compatibility
      return response.data.map(order => ({
        ...order,
        items: order.items_c ? JSON.parse(order.items_c) : [],
        total: order.total_c,
        status: order.status_c,
        orderDate: order.order_date_c,
        shippingAddress: order.shipping_address_c ? JSON.parse(order.shipping_address_c) : {},
        billingInfo: order.billing_info_c ? JSON.parse(order.billing_info_c) : {}
      }));
    } catch (error) {
      console.error("Error fetching orders:", error?.response?.data?.message || error);
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
          {"field": {"Name": "items_c"}},
          {"field": {"Name": "total_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "order_date_c"}},
          {"field": {"Name": "shipping_address_c"}},
          {"field": {"Name": "billing_info_c"}}
        ]
      };
      
      const response = await apperClient.getRecordById(tableName, id, params);
      
      if (!response.success || !response.data) {
        throw new Error("Order not found");
      }
      
      const order = response.data;
      // Map database field names to UI expected field names for compatibility
      return {
        ...order,
        items: order.items_c ? JSON.parse(order.items_c) : [],
        total: order.total_c,
        status: order.status_c,
        orderDate: order.order_date_c,
        shippingAddress: order.shipping_address_c ? JSON.parse(order.shipping_address_c) : {},
        billingInfo: order.billing_info_c ? JSON.parse(order.billing_info_c) : {}
      };
    } catch (error) {
      console.error(`Error fetching order ${id}:`, error?.response?.data?.message || error);
      throw new Error("Order not found");
    }
  },

  async create(orderData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      // Map UI field names to database field names
      const params = {
        records: [{
          items_c: JSON.stringify(orderData.items),
          total_c: orderData.total,
          status_c: orderData.status || "Confirmed",
          order_date_c: new Date().toISOString(),
          shipping_address_c: JSON.stringify(orderData.shippingAddress),
          billing_info_c: JSON.stringify(orderData.billingInfo)
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
          const order = created.data;
          return {
            ...order,
            items: order.items_c ? JSON.parse(order.items_c) : [],
            total: order.total_c,
            status: order.status_c,
            orderDate: order.order_date_c,
            shippingAddress: order.shipping_address_c ? JSON.parse(order.shipping_address_c) : {},
            billingInfo: order.billing_info_c ? JSON.parse(order.billing_info_c) : {}
          };
        }
      }
      
      throw new Error("Failed to create order");
    } catch (error) {
      console.error("Error creating order:", error?.response?.data?.message || error);
      throw new Error("Failed to create order");
    }
  },

  async updateStatus(id, status) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });
      
      const params = {
        records: [{
          Id: id,
          status_c: status
        }]
      };
      
      const response = await apperClient.updateRecord(tableName, params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }
      
      if (response.results && response.results.length > 0) {
        const updated = response.results[0];
        if (updated.success && updated.data) {
          const order = updated.data;
          return {
            ...order,
            items: order.items_c ? JSON.parse(order.items_c) : [],
            total: order.total_c,
            status: order.status_c,
            orderDate: order.order_date_c,
            shippingAddress: order.shipping_address_c ? JSON.parse(order.shipping_address_c) : {},
            billingInfo: order.billing_info_c ? JSON.parse(order.billing_info_c) : {}
          };
        }
      }
      
      throw new Error("Failed to update order status");
    } catch (error) {
      console.error("Error updating order status:", error?.response?.data?.message || error);
      throw new Error("Failed to update order status");
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
      console.error("Error deleting order:", error?.response?.data?.message || error);
      return false;
}
  }
};