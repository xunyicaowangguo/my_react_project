import Counter from '../components/counter'

import {increment,decrement,incrementAsync} from '../redux/actions/counter_action'

import {connect} from 'react-redux'

export default connect(
    state=>({count:state}),
    {increment,decrement,incrementAsync}
)(Counter)