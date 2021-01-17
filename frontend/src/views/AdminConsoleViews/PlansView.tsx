import * as React from 'react';
import {
  LocalAtm,
  PlaylistAdd,
} from '@material-ui/icons';
import {
  RichTableCard,
  KSpinner,
} from 'components';
import { getPlans } from 'request/methods/plans';
import { Plan } from 'responses/responseStructs';
import viewStyle from 'assets/jss/kiloStyles/classesViewStyle';

const PlansView: React.FC = () => {
  const [plans, setPlans] = React.useState<Plan[]>();
  const styleClasses = viewStyle();

  const plansUpdateFunc = async () => {
    const p = await getPlans();
    if (p) setPlans(p);
  };

  React.useEffect(() => {
    plansUpdateFunc();
  }, []);

  return(
    <div>
      { plans ? (
        <RichTableCard
          icon={LocalAtm}
          addIcon={PlaylistAdd}
          headerColor="green"
          tableHeaderColor="success"
          cardTitle="コース"
          tableHead={["ID", "名前", "毎月の料金"]}
          tableSources={plans}
          updateFunc={plansUpdateFunc}
          dataType="plans"
        >
        </RichTableCard>
      ) : (
        <div className={styleClasses.spinnerWrap}>
          <KSpinner color="success"/>
        </div>
      )}
    </div>

  );
};

export default PlansView;