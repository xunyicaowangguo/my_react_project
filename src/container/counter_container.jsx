import Counter from '../components/counter'

import {increment,decrement} from '../redux/actions/counter_action'

import {connect} from 'react-redux'

export default connect(
    state=>({count:state}),
    {increment,decrement}
)(Counter)