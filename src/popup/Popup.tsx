import React, { useState } from "react";



// 1. Create a component called Popup
const Popup: React.FC = () => {
    // 2. The component should manage two states represent the skills (I need the useState)
    const [skills, setSkills] = useState<string[]>([])
    const [input, setInput] = useState<string>("")

    // 3. handle the input change 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }
    // 4. handle key press
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            addSkill(input)
        }
    }
    // 5. handle adding skill


    function addSkill(input: string) {
        const trimmedSkill = input.trim()
        if (trimmedSkill && !skills?.includes(trimmedSkill)) {
            setSkills([...skills, trimmedSkill]);
            setInput("")
        }

    }
    // 6. handle removing skill 
    function removeSkill(skill: string) {
        setSkills(skills.filter(s => s !== skill))
    }



    return <div style={{ padding: "16px", width: "300px" }}>
        <h2>Add your skill</h2>
        <input type="text" value={input} onChange={handleInputChange} onKeyDown={handleKeyPress} placeholder="Type a skill and press enter" />

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{skills?.map(skill => {
            return <div key={skill}
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 8px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    borderRadius: '4px',
                    fontSize: '14px'
                }}>
                {skill}
                <button style={{
                    marginLeft: '8px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer'
                }} onClick={() => removeSkill(skill)}> &times;</button>
            </div>
        })}</div>
    </div>
}

export default Popup




