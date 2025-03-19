import type { UserConfig } from "@commitlint/types";
import { RuleConfigSeverity } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [RuleConfigSeverity.Warning, "always", 1000], // Aumenta la longitud máxima por línea
    "body-max-length": [RuleConfigSeverity.Warning, "always", 1000],
  },
};

export default Configuration;
