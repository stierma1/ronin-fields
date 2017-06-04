/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

[ \n\t\r]               return 'White_Space_Char'
"\\\\"                return 'FULLY_ESCAPED'
"\\"                  return 'ESCAPE_PUNC'
"{"                   return "{"
"}"                   return "}"
["]                  return 'DOUBLE_QUOTE'
[0-9a-f]              return 'HEX'
"-"                   return 'HYPHON'
(.)                   return 'Unknown_Char'
<<EOF>>               return 'EOF'

/lex

/* operator associations and precedence */

%start root

%% /* language grammar */

root
		: boxList EOF {
      $$ = $1;
      return $$;
    }
		;

boxList
    : /**/ {
      $$ = [];
      }
    | boxList boxItem White_Space_Char {
      $1.push($2)
      $$ = $1
    }
    ;

boxItem
    : boxName White_Space_Char boxId {
      $$ = {
        boxName: $1,
        boxId: $3
      };
    }
    ;

boxName
    : escapedString -> $1
    ;

boxId
    : "{" uuid "}" {
        $$ = $2;
      }
    ;

escapedChar
  		: ESCAPE_PUNC "}" -> $1 + $2
  		| ESCAPE_PUNC "{" -> $1 + $2
  		| ESCAPE_PUNC Unknown_Char -> $1 + $2
      | ESCAPE_PUNC ESCAPE_PUNC -> $1 + $2
      | ESCAPE_PUNC HEX -> $1 + $2
      | ESCAPE_PUNC White_Space_Char -> $1 + $2
      | ESCAPE_PUNC HYPHON -> $1 + $2
  		;

escapedDQuote
      : ESCAPE_PUNC DOUBLE_QUOTE -> $1 + $2
      ;

anyNonDoubleQEscapeBreakingString
      : /**/ -> ""
      | anyNonDoubleQEscapeBreakingString escapedDQuote -> $1 + $2
      | anyNonDoubleQEscapeBreakingString White_Space_Char -> $1 + $2
      | anyNonDoubleQEscapeBreakingString HEX -> $1 + $2
      | anyNonDoubleQEscapeBreakingString "{" -> $1 + $2
      | anyNonDoubleQEscapeBreakingString "}" -> $1 + $2
      | anyNonDoubleQEscapeBreakingString Unknown_Char -> $1 + $2
      | anyNonDoubleQEscapeBreakingString escapedChar -> $1 + $2
      | anyNonDoubleQEscapeBreakingString FULLY_ESCAPED -> $1 + $2
      | anyNonDoubleQEscapeBreakingString HYPHON -> $1 + $2
      ;

escapedString
      : DOUBLE_QUOTE anyNonDoubleQEscapeBreakingString DOUBLE_QUOTE {
        $$ = $2;
      }
      ;

uuid
      :  hex8 HYPHON hex4 HYPHON hex4 HYPHON hex4 HYPHON hex12 -> $1 + $2 + $3 + $4 + $5 + $6 + $7 + $8 + $9
      ;

hex8
      : HEX HEX HEX HEX HEX HEX HEX HEX -> $1 + $2 + $3 + $4 + $5 + $6 + $7 + $8
      ;
hex12
      : HEX HEX HEX HEX HEX HEX HEX HEX HEX HEX HEX HEX -> $1 + $2 + $3 + $4 + $5 + $6 + $7 + $8 + $9 + $10 + $11 + $12
      ;
hex4
      : HEX HEX HEX HEX -> $1 + $2 + $3 + $4
      ;
