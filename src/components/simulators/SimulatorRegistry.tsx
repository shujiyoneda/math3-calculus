import type { SimulatorId } from '../../types/curriculum'
import { CurveAnalysisSim } from './CurveAnalysisSim'
import { DerivativeZoomSim } from './DerivativeZoomSim'
import { EulerESim } from './EulerESim'
import { MeanValueSim } from './MeanValueSim'
import { RiemannSumSim } from './RiemannSumSim'
import { SinxOverXSim } from './SinxOverXSim'
import { SolidRevolutionSim } from './SolidRevolutionSim'
import { SubstitutionSim } from './SubstitutionSim'

export function SimulatorView({ id }: { id: SimulatorId }) {
  switch (id) {
    case 'sinx-over-x':
      return <SinxOverXSim />
    case 'euler-e':
      return <EulerESim />
    case 'derivative-zoom':
      return <DerivativeZoomSim />
    case 'mean-value':
      return <MeanValueSim />
    case 'curve-analysis':
      return <CurveAnalysisSim />
    case 'substitution':
      return <SubstitutionSim />
    case 'solid-revolution':
      return <SolidRevolutionSim />
    case 'riemann-sum':
      return <RiemannSumSim />
    default:
      return null
  }
}
