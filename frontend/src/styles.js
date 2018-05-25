import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  'body': {
    'margin': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'padding': [{ 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }, { 'unit': 'px', 'value': 0 }],
    'fontFamily': 'sans-serif',
    'backgroundColor': '#00838F'
  },
  'Dialog': {
    'position': 'fixed',
    'top': [{ 'unit': '%V', 'value': 0.5 }],
    'left': [{ 'unit': '%H', 'value': 0.5 }],
    'transform': 'translate(-50%, -50%)',
    'zIndex': '99'
  },
  'SNotifications': {
    'position': 'fixed',
    'right': [{ 'unit': 'px', 'value': 10 }],
    'top': [{ 'unit': 'px', 'value': 80 }],
    'width': [{ 'unit': 'px', 'value': 200 }],
    'height': [{ 'unit': 'px', 'value': 400 }],
    'backgroundColor': 'pink',
    'zIndex': '99'
  }
});
