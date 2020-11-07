import React from 'react'
import { Line } from 'react-chartjs-2'
import { MDBContainer } from 'mdbreact'
import Modal from 'react-bootstrap/Modal'

class ChartView extends React.Component {
  constructor(props) {
    super(props)

    this.dataLine = this.dataLine.bind(this)
  }

  dataLine() {
    return {
      labels: this.props.chartExerciseData.dates,
      datasets: [
        {
          label: this.props.chartExerciseData.name,
          fill: true,
          lineTension: 0.3,
          backgroundColor: 'rgba(184, 185, 210, .3)',
          borderColor: 'rgb(35, 26, 136)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgb(35, 26, 136)',
          pointBackgroundColor: 'rgb(255, 255, 255)',
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgb(0, 0, 0)',
          pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.props.chartExerciseData.weight,
        },
      ],
    }
  }

  render() {
    return (
      <Modal
        show={this.props.showChartView}
        onHide={this.props.toggleChartView}
      >
        <Modal.Header closeButton>
          <Modal.Title>Progress</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MDBContainer>
            <Line data={this.dataLine} options={{ responsive: true }} />
          </MDBContainer>
        </Modal.Body>
      </Modal>
    )
  }
}

export default ChartView
