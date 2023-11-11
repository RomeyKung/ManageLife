from flask import Flask, jsonify, request


app = Flask(__name__)


@app.route('/bmiCal', methods=["POST"])
def bmiCalculator():
    weight = float(request.args["w"])
    heightcm = float(request.args["h"])
    height = heightcm/100
    out = weight / (height * height)
    level = ""
    print(out)

    if out < 16 :
        level = "Severe Thinness"
    elif 16 < out < 17:
        level = "Moderate Thinness"
    elif 17 < out < 18.5:
        level = "Mild Thinness"
    elif 18.5 < out < 25:
        level = "Normal"
    elif 25 < out < 30:
        level = "Overweight"
    elif 30 < out < 35:
        level = "Obese Class I"
    elif 35 < out < 40:
        level = "Obese Class II"
    elif 40 < out:
        level = "Obese Class III"
    else:
        level = ""

    res = jsonify({'out': out, 'level': level, 'w': weight, 'h': height })
    return res

if __name__ == '__main__':
    app.run(debug=True, host="localhost", port=8090)
# if __name__ == '__main__':
#     app.run(debug=True, host="0.0.0.0", port=8090)

