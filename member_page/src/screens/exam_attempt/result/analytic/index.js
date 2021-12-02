import {Box} from "../../../../generator/_components";
import Nav from "../../../../generator/_components/nav";
import GeneralAnalyticBox from "./general";
import CourseMateAnalytic from "./course";

export default function AnalyticBox({question}) {
  return (
    <Box>
      <Nav
        defaultTab="general"
        tabs={[
          {id: "general", label: "General", content: (<GeneralAnalyticBox question={question}/>)},
          {id: "my_class", label: "My Class", content: (<CourseMateAnalytic question={question}/>)},
        ]}
      />
    </Box>
  )
}