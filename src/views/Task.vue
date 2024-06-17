<script lang="ts" setup>
import ScrollPanel from 'primevue/scrollpanel';
import { ref, onMounted } from "vue";
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import { marked } from 'marked';
import { ProductService } from './ProductService';
import { getTask } from '@/services/taskService';
import type { ITask } from '@/interfaces/submit';
import eventBus from "@/utilities/eventBus";
import { Severity } from "@/utilities/severityEnum";

const markdown = marked("Практическое занятие: технология изготовления сварного узла ручной дуговой сваркой<br><br><br><br>**Тема занятия:** Технология изготовления сварного узла ручной дуговой сваркой.<br><br><br><br>**Цели занятия:**<br><br><br><br>- Закрепить знания и привить навыки в разработке технологии изготовления сварного узла ручной дуговой сваркой.<br><br>- Научиться работать с технической и нормативной литературой.<br><br>- Выполнить сварку стыковых соединений в нижнем положении пластин в соответствии с ГОСТом ручной дуговой сваркой;<br><br>## Необходимые инструменты, защитные средства, оборудование, механизмы.<br><br>- Две пластины с V-образной разделкой кромок размерами, мм: 600 x 200 x 8. <br><br>- Калькулятор. <br><br>- Чертежные приспособления.<br><br>- Гост 5264 – 80. Ручная дуговая сварка. С<br><br>## Знания и навыки, необходимые для достижения результата.<br><br>Знать технологию и уметь выполнять сварку стыковых соединений ручной дуговой сваркой<br><br>## Задание<br><br>1. ## Выбор и характеристика материала конструкции. <br><br>1. ## Выбор сварочных материалов и их характеристика.<br><br>1. ## Расчет и выбор параметров режима сварки. <br><br>1. ## Выбор и характеристика источника питания сварочной дуги.<br><br>1. ## Схема поста для ручной дуговой сварки и его описание.<br><br>1. Выполнение сварки стыковых соединений в соответствии с ГОСТом ручной дуговой сваркой<br><br><br><br>Методика выполнения<br><br>##<br><br>## Ход работы<br><br><br><br>Методика выполнения <br><br><br><br>1. Выбор и характеристика материала конструкции исходя их назначения, условий работы, технических требований, выбирается материал для изготовления конструкции. <br><br><br><br>Указывается марка материала; ГОСТ на материал; приводится химический состав и механические свойства. <br><br><br><br>Исходя их назначения, условий работы, технических требований, выбирается материал для изготовления конструкции. Указывается марка материала; ГОСТ; приводится химический состав и механические свойства<br><br><br><br>2. Выбор сварочных материалов и их характеристика При ручной дуговой сварке, исходя их химического состава свариваемого металла, требований, предъявляемых к свариваемой конструкции, условий ее работы, определяется тип и марка электродов. <br><br><br><br>Широкое применение получили электроды типа Э46, марки: УОНИ-13/45А, АНО – 4, АНО – 21 и др. Они дают высокое качество металла шва и применяются для сварки ответственных швов из конструкционных сталей. Цифры после черты обозначают получаемый предел прочности металла шва (кгс/мм2 ). Сварку можно производить при любом положении шва, но только на постоянном токе обратной полярности. Эти электроды применяют в заводских и монтажных условиях. <br><br><br><br>3. Расчет и выбор параметров режима сварки <br><br><br><br>3.1 Режимом сварки называют совокупность характеристик сварочного процесса, обеспечивающих получение сварных соединений. При ручной дуговой сварке характеристиками являются: диаметр электрода (dэл), сила сварочного тока (Iсв), скорость перемещения электрода вдоль шва (Vсв), напряжение на дуге (Uд), род тока, полярность тока и т.д. <br><br><br><br>3.2 Расчет режимов сварки ведется в последовательности. <br><br><br><br>Шов выполняется по ГОСТ 5264-80-С17<br><br><br><br>1) Конструктивные элементы подготовки кромок и размеры шва на рисунке 2.28. <br><br><br><br>2) Площадь поперечного сечения наплавленного металла, мм кв. <br><br><br><br>Fн = 0,75∙ e∙q + S∙b + h 2 ∙ tgα,<br><br><br><br>где h – глубина проплавления, мм, h = S – с , (2.12) <br><br><br><br>где с – притупление при разделке кромок.<br><br><br><br>![Рисунок 2.28](img_test0002_2_28.jpg)<br><br><br><br>3) Диаметр электрода, dэл, мм, Диаметр электрода для стыкового соединения подбирают по толщине металла по таблице 2.10. <br><br><br><br>![Таблица 2.10](img_test0002_t_2_10.jpg)<br><br><br><br>4) Величина сварочного тока, <br><br><br><br>![Формула 2.13](img_test0002_f_2_13.jpg)<br><br><br><br>где j – допускаемая плотность тока , А/мм2 ; j – выбирается из таблицы 2.11. <br><br><br><br>![Таблица 2.11](img_test0002_t_2_11.jpg)<br><br>### Этапы выполнения работы.<br><br>1. Обучающийся подготавливает металл под сварку, укладывает пластины на ровную поверхность зачищенными кромками, чтобы не было разностенок. <br><br>   Обучающийся делает прихватки пластин<br><br>1. Обучающийся сваривает стыковое соединение <br><br>1. Обучающийся осуществляет контроль путем внешнего осмотра.<br><br><br><br>### Результат выполнения задания.<br><br>1. Загрузка результатов работы в систему работы.<br><br>1. Сдача рабочего места.<br><br><br><br>**Результат работы загружается в виде фотографии (не менее одной) с комментарием (опционально) к ней. Комментарий по работе может содержать:**<br><br><br><br>1. Номер работы, тему, цель работы, исходные материалы и данные.<br><br>1. Используемую литературу и другие источники.<br><br>1. Марку сварочного оборудования и материалов.<br><br>1. Технологию выполнения работы.<br><br>1. Выявленные дефекты, их причины и способы устранения.<br><br>1. Вывод по работе.")

onMounted(() => {
    ProductService.getProductsSmall().then((data) => (products.value = data.slice(0, 3)));
    someTaskRequest()
});

const products = ref();

let id = "tsk0002"

let someTaskData = ref<ITask>({
    code: "",
    title: "",
    content: "",
    description: "",
    supplement: [{
        title: "",
        file: ""
    }],
    difficulty: 0,
    time: 0,
    lessons: [{
        code: "",
        title: "",
        traits: [{
            code: "",
            name: "",
            description: ""
        }]
    }]
});

const someTaskRequest = () => {
  getTask(id).then(
    response => {
      console.log(response)
      someTaskData = response.data;
      console.log(someTaskData);
    }
  ).catch(
    error => {
      console.log(error)
      eventBus.emit('toast', { severity: Severity.ERROR, summary: 'Ошибка получения данных', detail: 'Неправильно ролучены данные', life: 3000 });
    }
  )
}

</script>

<template>
    <div class="task-container">
        <div class="sidebar">
        <div class="lesson-sidebar">
            <DataView dataKey="value" :value="products" paginator :rows="3">
                <template #header><p class="lesson-sidebar-header">Учебные материалы</p></template>
                <template #list="slotProps">
                    <div class="flex flex-col">
                        <div v-for="(item, index) in slotProps.items" :key="index">
                            <div class="flex flex-col sm:flex-row sm:items-center p-6 gap-4" :class="{ 'border-t border-surface-200 dark:border-surface-700': index !== 0 }">
                                <div class="flex flex-col md:flex-row justify-between md:items-center flex-1 gap-6">
                                    <div class="flex flex-row md:flex-col justify-between items-start gap-2">
                                        <div>
                                            <div class="text-lg font-medium mt-2">{{ item.title }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </DataView>
        </div>
        <div class="result-sidebar">
            <Panel>
                <template #header>
                    <div class="flex items-center gap-2">
                        <span class="font-bold">Денис Пешехонов</span>
                    </div>
                </template>
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </Panel>
        </div>
        </div>
        <div class="main-c">
        <div class="title-card">
            <Card style="overflow: hidden">
                <template #title>{{ someTaskData.title }}</template>
                <template #content></template>
            </Card>
        </div>
        <div class="article-card">
            <ScrollPanel style="width: 100%; height: 100%">
                <div v-html="markdown"></div>
            </ScrollPanel>
        </div>
        </div>
    </div>

</template>

<style>
.task-container {
    display: flex;
    flex-direction: row;
}
.article-card {
    background: rgb(255, 255, 253);
    border: 2px solid rgb(223, 226, 226);
    /* width: 140vh; */
    height: 65vh;
    border-radius: 10px;
    padding: 2rem;
    /* margin-bottom: 1rem; */
    /* max-width: 75% */
    /* margin-top: 200px;
    position: absolute;
    top: 1vh;
    right: 20px; */
    /* flex: 0 0 70% */
}

.title-card {
    /* width: 140vh; */
    height: 25vh;
    /* max-width: 75%; */
    /* position: fixed; */
    /* top: 30px;
    right: 20px; */
    /* flex: 0 0 70% */
}

.main-c {
    display: flex;
    flex-direction: column;
    /* max-width: 75%; */
}

.p-card {
    /* border-radius: 10px; */
    /* height: 16vh;
    width: 140vh; */
    /* border: solid 2px rgb(223, 226, 226);
    height: 16vh; */
}

.lesson-sidebar {
    /* width: 50vh; */
    height: 50vh;
    /* position: fixed;
    left: 20px;
    top: 30px; */
    /* flex: 0 0 30% */
    max-width: 80%;
}

.result-sidebar {
    /* width: 50vh;
    height: 43vh;
    position: fixed;
    left: 20px;
    top: 520px; */
    border: solid 2px rgb(223, 226, 226);
    border-radius: 10px;
    height: 40vh;
    /* flex: 0 0 30% */
    max-width: 80%;
}

.p-dataview {
    border: solid 2px rgb(223, 226, 226);
    border-radius: 10px;
}

.sidebar {
    display: flex;
    flex-direction: column;
    max-width: fit-content;
}

.lesson-sidebar-header {
    font-size: 25px;
}
</style>