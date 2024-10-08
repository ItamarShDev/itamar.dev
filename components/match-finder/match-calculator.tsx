import Fireworks from "components/match-finder/fireworks";
import MatchProgress from "components/match-finder/match-progress";
import PropertiesSelect from "components/match-finder/properties-select";
import { useState } from "react";
import styles from "./MatchCalculator.module.css";
import CallMe from "./call-me";

function MatchCalculator({ properties }) {
	const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
	const [qualificationText, setQualificationText] = useState("");
	const [percentage, setPercentage] = useState(0);
	return (
		<div className={styles.container}>
			<section>
				<PropertiesSelect
					setSelectedSkills={setSelectedSkills}
					qualificationText={qualificationText}
					properties={properties}
				/>
				<MatchProgress
					selectedSkills={selectedSkills}
					setQualificationText={setQualificationText}
					percentage={percentage}
					setPercentage={setPercentage}
				/>
			</section>
			<section>
				<Fireworks percentage={percentage} />
				{percentage >= 90 && <CallMe />}
			</section>
		</div>
	);
}

export default MatchCalculator;
