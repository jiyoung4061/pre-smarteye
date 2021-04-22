<template>
<div>
    <side-bar></side-bar>
    <div id='content'>
    <div class="pageTitle">
        사용자 정보
        <span class="addContainer" v-on:click="addUserInfoBtn">
            <i class="addBtn fas fa-plus fa" aria-hidden="true"></i>
        </span>
        <span class="addContainer" v-on:click="modifyUserInfoBtn(selected.length, selected, todos)">
            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
        </span>
        <span class="addContainer" v-on:click="deleteUserInfoBtn(selected)">
            <i class="fas fa-trash-alt" aria-hidden="true"></i>
        </span>
    </div>

    <!-- 사용자 정보 추가 팝업 -->
    <Modal v-if="userInfoSetModal" v-on:close="userInfoSetModal = false">
        <div slot="header">사용자 추가
            <i class="closeModalBtn fas fa-times" v-on:click="userInfoSetModal = false" aria-hidden="true"></i>
        </div>

        <div slot="body">
            <div>사용자 정보</div>
            <br/>
            <div>ID<input type="text" v-model="id" placeholder="사용자 ID 입력"/></div>
            <div>이름<input type="text" v-model="lastName" placeholder="사용자 이름 입력"/></div>
            <div>성<input type="text" v-model="firstName" placeholder="성 입력"/></div>
            <div>성별
                <select name="selectingGender" v-bind="gender">
                    <option value="male">남성</option>
                    <option value="weekly">여성</option>
                    <option value="yearly">불명</option>
                </select>
            </div>
            <br/>
            <div>비밀번호<input type="password" v-model="inPassword" placeholder="비밀번호 입력">
            </div>
            <div>비밀번호 확인<input type="password" v-model="confirmPassword" placeholder="입력 비밀번호 확인">
            </div>
            <br/>
            <div>팀<input type="text" v-model="team" placeholder="팀 입력"/>
            </div>
            <div>직위<input type="text" v-model="position" placeholder="직위 입력"/>
            </div>
            <div>역할<input type="text" v-model="role" placeholder="역할 입력"/>
            </div>
            <br/>
            <div>CCTV 그룹
                <select name="selectingGroup" v-model="selectGroup" >
                    <option v-for="(cctvGroups,index) in getCCTVGroups" :key="index">
                        {{cctvGroups.group}}
                    </option>
                </select>
                <button v-on:click="addCCTVGroup(selectGroup)">추가</button>
            </div>
            <span v-for="(cctv,index) in cctvGroups" :key="cctv">
                {{cctv}}
                <span class="cctvGroupRemove" type="button" v-on:click="removeCCTV(index)">
                    <i class="closeModalBtn fas fa-times"></i>
                </span>
            </span>
        </div>

        <span slot="footer" v-on:click="UserInfoSetModal = false">
            <button v-on:click="addUserInfo(id,firstName,lastName,gender,team,position,role,inPassword,confirmPassword)">추가</button>
            <button v-on:click="userInfoCancle">취소</button>
        </span>
    </Modal>

    <!-- 사용자 정보 수정 팝업 -->
    <Modal v-if="userInfoModifyModal" v-on:close="userInfoModifyModal = false">
        <div slot="header">사용자 수정
            <i class="closeModalBtn fas fa-times" v-on:click="userInfoModifyModal = false" aria-hidden="true"></i>
        </div>

        <div slot="body">
            <div>사용자 정보</div>
            <br/>
            <div>ID<input type="text" v-model="id" disabled ></div>
            <div>이름<input type="text" v-model="lastName" placeholder="사용자 이름 입력"/></div>
            <div>성<input type="text" v-model="firstName" placeholder="성 입력"/></div>
            <div>성별
                <select name="selectingGender" v-model="gender">
                    <option value="male">남성</option>
                    <option value="female">여성</option>
                    <option value="unknown">불명</option>
                </select>
            </div>
            <br/>
            <div>비밀번호<input type="password" v-model="inPassword" placeholder="비밀번호 입력">
            </div>
            <div>비밀번호 확인<input type="password" v-model="confirmPassword" placeholder="입력 비밀번호 확인">
            </div>
            <br/>
            <div>팀<input type="text" v-model="team" placeholder="팀 입력"/>
            </div>
            <div>직위<input type="text" v-model="position" placeholder="직위 입력"/>
            </div>
            <div>역할<input type="text" v-model="role" placeholder="역할 입력"/>
            </div>
            <br/>
            <div>CCTV 그룹
                <select name="selectingGroup" v-model="selectGroup" >
                    <option v-for="(cctvGroups,index) in getCCTVGroups" :key="index">
                        {{cctvGroups.group}}
                    </option>
                </select>
                <button v-on:click="addCCTVGroup(selectGroup)">추가</button>
            </div>
            <span v-for="(cctv,index) in cctvGroups" :key="cctv">
                {{cctv}}
                <span class="cctvGroupRemove" type="button" v-on:click="removeCCTV(index)">
                    <i class="closeModalBtn fas fa-times"></i>
                </span>
            </span>
        </div>

        <span slot="footer" v-on:click="UserInfoModifyModal = false">
            <button v-on:click="modifyUserInfo(id,firstName,lastName,gender,team,position,role)">수정</button>
            <button v-on:click="userInfoCancle">취소</button>
        </span>
    </Modal>

    <div>
        <table class="userTable">
            <colgroup>
                <col width="1%">
            </colgroup>
            <thead>
                <tr class="tTitle">
                    <th><input type="checkbox" v-model="selectAll" v-on:click="select"></th>
                    <th>번호</th>
                    <th>ID</th>
                    <th>이름</th>
                    <th>팀</th>
                    <th>직위</th>
                    <th>역할</th>
                </tr>
            </thead>
            <tbody>
                <tr class="tBody" v-for="(todo,i) in todos" :key="i" >
                    <td><input type="checkbox" :value="todo.id" v-model="selected"></td>
                    <td>{{ i+1 }}</td>
                    <td>{{ todo.id }}</td>
                    <td>{{ todo.name }}</td>
                    <td>{{ todo.team }}</td>
                    <td>{{ todo.position }}</td>
                    <td>{{ todo.role }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
    
</div>
</template>

<script>
import Modal from '../../../common/Modal'
import SideBar from '../../common/SideBar.vue'

export default {
    components:{
        Modal: Modal,
        SideBar
    },
   data(){
       return{
           userInfoSetModal:false,
           userInfoModifyModal:false,
           firstName:'',
           lastName:'',
           id:'',
           name:'',
           gender:'',
           inPassword:'',
           confirmPassword:'',
           team:'',
           position:'',
           role:'',
           users:[],
           todos:[],
           getCCTVGroups:[],
           selectGroup:'',
           cctvGroups:[],
           selected:[],
           selectAll:false
       }
   },

    methods:{
        getUserLogin(){
            this.$http.get('http://localhost:3000/userLogin')
            .then((res) => {
                console.log('getUsers:', res.data)
                this.users = res.data
            })            
        },
        getTodos(){
            this.$http.get('http://localhost:3000/todoData')
            .then((res) => {
                console.log('getTodos:', res.data)
                this.todos = res.data
            })            
        },
        getCCTVs(){
            this.$http.get('http://localhost:3000/cctvGroup')
            .then((res) => {
                console.log('getCCTVGroups:', res.data)
                this.getCCTVGroups = res.data
            })
        },
        select() {
			this.selected = [];
            if(!this.selectAll){
                for(let i in this.todos){
                    this.selected.push(this.todos[i].id)
                }
            }
		},     
        addUserInfoBtn(){
            this.userInfoSetModal = !this.userInfoSetModal;
        },
        addUserInfo(id,firstName,lastName,gender,team,position,role,inPassword,confirmPassword){
            // if(id && firstName && lastName && team && position && role){
                if(inPassword!=confirmPassword){
                    alert("입력한 비밀번호와 확인 비밀번호가 다릅니다.")
                }else{
                    this.$http.post('http://localhost:3000/todoData',{
                        id:id,
                        firstName:firstName,
                        lastName:lastName,
                        name:firstName+lastName,
                        gender:gender,
                        password:inPassword,
                        team:team,
                        position:position,
                        role:role,
                        cctvGroups:this.cctvGroups
                    }).then((res) => {
                        this.todos.push(res.data);
                        this.id = '',
                        this.firstName = '',
                        this.lastName = '',
                        this.name = '',
                        this.gender = '',
                        this.inPassword = '',
                        this.confirmPassword ='',
                        this.team = '',
                        this.position = '',
                        this.role = '',
                        this.cctvGroups=[];
                    })
                }
            // }
            this.userInfoSetModal = !this.userInfoSetModal;
        },
        modifyUserInfoBtn(length, id, todos){
            if(length==0){
                alert("수정하실 사용자를 체크해 주세요")
            }else if(length==1){
                for(let i=0; i<todos.length; i++){
                    if(id==todos[i].id){
                        this.id=todos[i].id;
                        this.firstName=todos[i].firstName;
                        this.lastName=todos[i].lastName;
                        this.gender=todos[i].gender;
                        this.team=todos[i].team;
                        this.position=todos[i].position;
                        this.role=todos[i].role;
                        this.cctvGroups=todos[i].cctvGroups;
                    }
                }
                console.log(todos);
                this.userInfoModifyModal = !this.userInfoModifyModal;
            }else{
                alert("수정하실 사용자를 1명만 체크해 주세요")
            }
        },
        modifyUserInfo(id,firstName,lastName,gender,team,position,role,inPassword){
            // if(id && firstName && lastName && team && position && role){
                this.$http.patch('http://localhost:3000/todoData/'+id,{
                    id:id,
                    firstName:firstName,
                    lastName:lastName,
                    name:firstName+lastName,
                    gender:gender,
                    password:inPassword,
                    team:team,
                    position:position,
                    role:role,
                    cctvGroups:this.cctvGroups
                }).then((res) => {
                    this.getTodos()
                    this.id = '',
                    this.firstName = '',
                    this.lastName = '',
                    this.name = '',
                    this.gender = '',
                    this.team = '',
                    this.position = '',
                    this.role = '',
                    this.cctvGroups=[];
                })
            // }
            this.selected=[]
            this.userInfoModifyModal = !this.userInfoModifyModal;
        },
        userInfoCancle(){
            this.id = '',
            this.firstName = '',
            this.lastName = '',
            this.name = '',
            this.gender = '',
            this.team = '',
            this.position = '',
            this.role = '',
            this.selected=[],
            this.cctvGroups=[];
            if(this.userInfoModifyModal == true){
                this.userInfoModifyModal = false;
            }else if(this.userInfoSetModal == true){
                this.userInfoSetModal = false;
            }
        },
        deleteUserInfoBtn(todo){
            for(let i=0; i<todo.length; i++){
                this.$http.delete('http://localhost:3000/todoData/'+todo[i])
                .then((res) => {
                    this.getTodos()
                })
            }
            this.selected=[]
        }
        ,
        addCCTVGroup(group){
            if(!this.isExist(group)){
                this.cctvGroups.push(group);
                this.cctvGroups.sort();
            }else{
                alert("이미 사용자가 속해있는 CCTV그룹입니다.");
            }
        },
        removeCCTV(index){
            this.cctvGroups.splice(index,1)
        },
        isExist(group){
            let returnFlag = false;
            for(let i in this.cctvGroups){
                if(this.cctvGroups[i] == group){
                    returnFlag = true;
                }
            }
            console.log(returnFlag);
            return returnFlag;
        }
    },
    mounted(){
        this.getUserLogin();
        this.getTodos();
        this.getCCTVs();
    },
}
</script>

<style scoped>
#content {
    padding-left: 270px;
}
table {
    width:100%;
    border-collapse: collapse;
    border: 1px solid black;
    text-align:center;
    table-layout: fixed;
}
tr{
    vertical-align : top;
}
.tTitle {
    border-bottom: 1px solid ;
}
.tBody{
    overflow:scroll;
}
</style>
