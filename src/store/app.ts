import { ITab } from "@/components/UI/Tabs/TabsBase.types";
import { ICard } from "@/components/ReceiptList/types";
import { defineStore } from "pinia";
import axios from "axios";

const SERVICE_PORT = import.meta.env.VITE_SERVICE_PORT;

interface RootState {
  currentTab: ITab;
  selectedProducts: string[] | [];
  searchProducts: string[] | [];
  receiptList: ICard[] | [];
  totalReceipts: number;
}

const baseUrl = `http://localhost:${SERVICE_PORT}/api`;

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
          .get(baseUrl + "/compositions", {
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
      return new Promise((res, rej) => {
        axios
          .get(baseUrl + `/receipts/${category}`, {
            params: {
              compositions: this.selectedProducts,
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
