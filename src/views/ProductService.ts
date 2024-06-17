export const ProductService = {
    getProductsData() {
        return [
            {
                id: '1000',
                title: 'КЛАССИФИКАЦИЯ ВИДОВ СВАРКИ И СУЩНОСТЬ СВАРОЧНЫХ ПРОЦЕССОВ'
            },
            {
                id: '1001',
                title: 'ОБЩИЕ СВЕДЕНИЯ О СВАРКЕ'
            },
            {
                id: '1002',
                title: 'Практическое занятие: Исследование процесса сварки алюминия'
            },
        ];
    },

    getProductsMini() {
        return Promise.resolve(this.getProductsData().slice(0, 3));
    },

    getProductsSmall() {
        return Promise.resolve(this.getProductsData().slice(0, 3));
    },

    getProducts() {
        return Promise.resolve(this.getProductsData());
    },
};

