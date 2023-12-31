import { ITab } from "@/components/UI/Tabs/types";
import { ICard } from "@/components/ReceiptList/types";
import { defineStore } from "pinia";
import { decodeToBase64 } from "@/utils/helpers";
import axios from "axios";

const SERVICE_PORT = import.meta.env.VITE_SERVICE_PORT;
const isProd = import.meta.env.PROD;

interface RootState {
  currentTab: ITab;
  selectedProducts: string[] | [];
  searchProducts: string[] | [];
  receiptList: ICard[] | [];
  totalReceipts: number;
}

const baseUrl = `http://${
  isProd ? "185.104.249.100" : "localhost"
}:${SERVICE_PORT}/api`;

export const useAppStore = defineStore("app", {
  state: () =>
    ({
      currentTab: {},
      searchProducts: [],
      selectedProducts: [],
      receiptList: [],
      totalReceipts: 0,
    } as RootState),
  actions: {
    removeProduct(product: string): void {
      this.$state.selectedProducts = this.$state.selectedProducts.filter(
        (el) => el !== product
      );
    },
    async findProducts(product: string): Promise<string[]> {
      return new Promise((res, rej) => {
        axios
          .get(baseUrl + "/products", {
            params: {
              search: product,
            },
          })
          .then((result) => {
            this.searchProducts = result.data.data;
            res(result.data.data);
          })
          .catch(rej);
      });
    },
    async getReceipts(category: string): Promise<ICard[]> {
      const products = this.selectedProducts.map((el) => decodeToBase64(el));
      return new Promise((res, rej) => {
        axios
          .get(baseUrl + `/receipts/${category}`, {
            params: {
              compositions: products,
              mode: "strict",
            },
          })
          .then((result) => {
            this.receiptList = result.data.data;
            this.totalReceipts = this.receiptList.length;
            res(result.data.data);
          })
          .catch(rej);
      });
    },
  },
});
