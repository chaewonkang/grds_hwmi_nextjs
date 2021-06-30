import { observable } from "mobx";
import { observer } from "mobx-react";

class Store {
    @observable mode = 'dev'; // dev, prod
    @observable layoutMode = ''; // desktop, tablet, mobile
    @observable dummy = [{}, {}, {}, {}, {}, {}, ];

}
export default (new Store);