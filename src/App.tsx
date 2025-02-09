import {
  AppWrapper,
  AppMiddleColumn,
  CenterSectionWrapper,
  Row,
} from './App.styles'
import LogoThreeWrapper from './components/LogoThree/LogoThreeWrapper';
import LogoSixWrapper from './components/LogoSix/LogoSixWrapper';
import LogoOneWrapper from './components/LogoOne/LogoOneWrapper';
import LogoFourWrapper from './components/LogoFour/LogoFourWrapper';
// import LogoFiveWrapperOLD from './components/LogoFiveOLD/LogoFiveWrapperOLD';
import LogoTwoWrapper from './components/LogoTwo/LogoTwoWrapper';
import LogoFiveWrapper from './components/LogoFive/LogoFiveWrapper';

function App() {
  return (
    <AppWrapper>
      <AppMiddleColumn>
        <CenterSectionWrapper>
          <Row>
            <LogoOneWrapper />        
            <LogoTwoWrapper />
          </Row>

          <Row>
            <LogoThreeWrapper />
            <LogoFourWrapper />
          </Row>

          <Row>
            <LogoFiveWrapper />
            <LogoSixWrapper />
          </Row>
        </CenterSectionWrapper>
      </AppMiddleColumn>
    </AppWrapper>
  )
}

export default App;
