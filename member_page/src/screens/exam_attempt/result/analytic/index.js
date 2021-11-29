import {Box} from "../../../../generator/_components";
import Nav from "../../../../generator/_components/nav";
import GeneralAnalyticBox from "./general";
import CourseMateAnalytic from "./course";

export default function AnalyticBox({attemptId, qOrder}) {
  return (
    <Box>
      <Nav
        defaultTab="general"
        tabs={[
          {id: "general", label: "General", content: (<GeneralAnalyticBox attemptId={attemptId} qOrder={qOrder}/>)},
          {id: "my_class", label: "My Class", content: (<CourseMateAnalytic attemptId={attemptId} qOrder={qOrder}/>)},
        ]}
      />
    </Box>
  )
}