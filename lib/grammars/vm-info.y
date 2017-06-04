/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

Name\:\s\s+([^\r\n]+)       return 'NAME'
Guest\ OS\:\s+([^\r\n]+)  return 'GUEST_OS'
UUID\:\s+([^\r\n]+)  return 'UUID'
State\:\s+([^\r\n]+)  return 'STATE'
Shared\ Folders\:\s+  return 'SHARED_FOLDERS'
Memory\ size\:\s+([^\r\n]+)  return "MEMORY_SIZE"
Number\ of\ CPUs\:\s+[0-9]+  return "NUMBER_OF_CPUS"
NIC\ [0-9]+\:\s+([^\r\n]+)               return "NIC_INFO"
NIC\ [0-9]+\ Settings\:\s+([^\r\n]+)				return "NIC_SETTINGS"
NIC\ [0-9]+\ Rule\([0-9]+\)\:\s+([^\r\n]+)      return  "NIC_RULE"
\s                    			return 'White_Space_Char'
(.)                   return 'Unknown_Char'
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%start root

%% /* language grammar */

root
		: infoObject EOF {
      $$ = $1;
			return $$;
    }
		;

infoObject
		: /**/ {
				$$ = {nics:[]};
		}
		| infoObject unwantedInfo {
				$$ = $1;
			}
		| infoObject NAME {
				$1["name"] = $2.replace("Name:", "").trim();
				$$ = $1
			}
		| infoObject GUEST_OS {
				$1["guestOS"] = $2.replace("Guest OS:", "").trim();
				$$ = $1
			}
		| infoObject UUID {
					$1["uuid"] = $2.replace("UUID:", "").trim();
					$$ = $1
			}
		| infoObject STATE {
						$1["state"] = $2.replace("State:", "").trim();
						$$ = $1
				}
		| infoObject MEMORY_SIZE {
				$1["memorySize"] = $2.replace("Memory size:", "").trim();
				$$ = $1
			}
		| infoObject NUMBER_OF_CPUS {
				$1["numberOfCPUs"] = parseInt($2.replace("Number of CPUs:", "").trim());
				$$ = $1
			}
		| infoObject NIC_INFO {
				var nicReg = /^NIC\ ([0-9]+)/
				var num = parseInt(nicReg.exec($2)[1]) - 1;
				var info = $2.replace(/^NIC\ ([0-9]+)\:/, "").trim();
				if(info !== "disabled"){
					$1.nics[num] = $1.nics[num] || {rules:[]};
					$1.nics[num].info = info;
				}
				$$ = $1
			}
		| infoObject NIC_SETTINGS {
				var nicReg = /^NIC\ ([0-9]+)/
				var num = parseInt(nicReg.exec($2)[1]) - 1;
				var settings = $2.replace(/^NIC\ ([0-9]+)\ Settings\:/, "").trim();
				$1.nics[num] = $1.nics[num] || {rules:[]};
				$1.nics[num].settings = settings;
				$$ = $1
			}
		| infoObject NIC_RULE {
			$$ = $1
				var nicReg = /^NIC\ ([0-9]+)/
				var num = parseInt(nicReg.exec($2)[1]) - 1;
				var rulePortion = $2.replace(/^NIC\ ([0-9]+)/, "").trim();
				var nicRule = /^Rule\(([0-9]+)\)\:/
				var ruleNum = nicRule.exec(rulePortion)[1];
				var rule = rulePortion.replace(nicRule, "").trim();
				var rule = rule.split(",").map((t) => {return t.trim()})
					.map((t) => {
						return t.split("=").map((z) => {return z.trim().replace(/ /, "_")})

					}).reduce((red, val) => {
						red[val[0]] = val[1];
						return red;
					}, {});
				$1.nics[num] = $1.nics[num] || {rules:[]};
				$1.nics[num].rules[ruleNum] = rule;
				$$ = $1;
		}
		;

sharedFolders
		: SHARED_FOLDERS NAME {
		  console.log($1 + $2)
		}
		;

unwantedInfo
    : White_Space_Char
		| Unknown_Char
		;
