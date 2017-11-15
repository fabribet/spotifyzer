import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Home from './Home'

const mapStateToProps = state => ({
  token: state.token
})

export default withRouter(connect(mapStateToProps)(Home))
