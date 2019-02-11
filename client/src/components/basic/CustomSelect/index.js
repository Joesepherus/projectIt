import React from 'react'
import './index.css'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import { inject } from 'mobx-react'

@inject('translate')
export default class CustomSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: ''
    }
  }

  componentDidMount() {
    if (this.props.selected && this.props.selected !== null) {
      this.setState({ type: Number(this.props.selected) })
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value }, () => {
      this.props.filter(event.target.value)
    })
  }

  render() {
    return (
      <div>
        <FormControl>
          <InputLabel htmlFor="type" className={'custom-select-label'}>
            {this.props.title}
          </InputLabel>
          <Select
            className={'custom-select-select'}
            value={this.state.type}
            onChange={this.handleChange}
            inputProps={{
              name: 'type',
              id: 'type'
            }}
          >
            <MenuItem value={''}>Všetky</MenuItem>
            {this.props.data.map((data, i) => {
              let tmpDataTitle = data.title.toUpperCase()
              return (
                <MenuItem key={data.title} value={data.id}>
                  {this.props.translate.i18n.GLOBAL.DOC_TYPES[tmpDataTitle]}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>
    )
  }
}
