/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%


UUID\:\s+([^\r\n]+)       return 'UUID'
Parent\ UUID\:\s+([^\r\n]+)       return 'PARENT_UUID'
State\:\s+([^\r\n]+)       return 'STATE'
Type\:\s+([^\r\n]+)       return 'TYPE'
Location\:\s+([^\r\n]+)       return 'LOCATION'
Storage\ format\:\s+([^\r\n]+)       return 'STORAGE_FORMAT'
Capacity\:\s+([^\r\n]+)       return 'CAPACITY'
Encryption\:\s+([^\r\n]+)       return 'ENCRYPTION'
\s              return 'White_Space_Char'
(.)                   return 'Unknown_Char'
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%start root

%% /* language grammar */

root
		: hddList EOF {
      $$ = $1;
      return $$;
    }
		;

hddList
    : /**/ {
      $$ = [];
      }
    | hddList hddItem White_Space_Char {
      $1.push($2)
      $$ = $1
    }
    ;

hddItem
		: UUID White_Space_Char PARENT_UUID White_Space_Char STATE White_Space_Char TYPE White_Space_Char LOCATION White_Space_Char STORAGE_FORMAT White_Space_Char CAPACITY White_Space_Char ENCRYPTION White_Space_Char {
				$$ = {
					uuid: $1.replace(/UUID\:/,"").trim(),
					parentUuid: $3.replace(/Parent\ UUID\:/, "").trim(),
					state: $5.replace(/State\:/, "").trim(),
					type: $7.replace(/Type\:/, "").trim(),
					location: $9.replace(/Location\:/, "").trim(),
					storageFormat: $11.replace(/Storage\ format\:/, "").trim(),
					capacity: $13.replace(/Capacity\:/, "").trim(),
					encryption: $15.replace(/Encryption\:/, "").trim()
				}
		}
		;
