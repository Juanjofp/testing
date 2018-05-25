import { configure } from 'enzyme';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import XMLHttpRequest from 'xhr2';

global.XMLHttpRequest = XMLHttpRequest;
configure({ adapter: new Adapter() });

if(!window.localStorage) {
    window.localStorage = {
        getItem: function(key) {return this[key];},
        setItem: function(key, val) {this[key] = String(val);},
        removeItem: function(key) {delete this[key];}
    };
}