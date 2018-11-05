import Vue from "vue"
// import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import "element-ui/lib/theme-chalk/display.css"
import {
    Row,
    Col,
    Button,
    Card,
    ButtonGroup,
    Badge,
    Input,
    InputNumber,
    DatePicker,
    Menu,
    Main,
    MenuItem,
    Submenu,
    MenuItemGroup,
    Loading,
    Table,
    TableColumn,
    Select,
    Option,
    OptionGroup,
    Pagination,
    Dialog,
    Message,
    Checkbox,
    Notification,
    Steps,
    Step,
    FormItem,
    Form,
    Alert,
    MessageBox,
    Switch,
    Radio,
    RadioGroup,
    RadioButton,
    Popover,
    Slider,
    Tabs,
    TabPane,
    Collapse,
    CollapseItem,
} from "element-ui"






// Vue.use(ElementUI)

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Slider)
Vue.use(ButtonGroup)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(DatePicker)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(Loading.directive)
Vue.use(Table)
Vue.use(Card)
Vue.use(TableColumn)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Main)
Vue.use(Alert)
Vue.use(Switch)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Popover)
Vue.use(Badge)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Collapse);
Vue.use(CollapseItem);


Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
// Vue.prototype.$alert = MessageBox.alert
// Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

// if (process.BROWSER_BUILD) {
//     Vue.use(require('element-ui'))
// }
