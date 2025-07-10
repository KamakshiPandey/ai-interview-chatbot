#include <iostream>
#include <string>
#include <nlohmann/json.hpp>
#include <vector>
#include <algorithm>
#include <cctype>

using json = nlohmann::json;
using namespace std;

// Helper to lowercase strings
string toLower(const string& str) {
    string lower;
    for (char c : str)
        lower += tolower(c);
    return lower;
}

// Count keyword overlap
int keywordMatchScore(const string& answer, const vector<string>& keywords) {
    int score = 0;
    string ans = toLower(answer);
    for (const string& word : keywords) {
        if (ans.find(toLower(word)) != string::npos)
            score++;
    }
    return score;
}

int main() {
    string inputJson;
    getline(cin, inputJson);  // Read entire JSON line from stdin

    json input = json::parse(inputJson);
    string question = input["question"];
    string answer = input["answer"];

    // Simple heuristics
    int lengthScore = min((int)answer.length() / 50, 5); // 0 to 5 points
    vector<string> importantWords = {"team", "project", "problem", "solution", "learning", "leadership"};
    int keywordScore = keywordMatchScore(answer, importantWords); // up to 6

    int totalScore = min(lengthScore + keywordScore, 10); // cap at 10

    string feedback;
    if (totalScore >= 8)
        feedback = "Excellent and detailed answer.";
    else if (totalScore >= 5)
        feedback = "Good answer. Could use more depth or structure.";
    else
        feedback = "Needs improvement. Add more clarity and examples.";

    // Output JSON
    json output;
    output["score"] = to_string(totalScore) + "/10";
    output["feedback"] = feedback;

    cout << output.dump() << endl;
    return 0;
}
