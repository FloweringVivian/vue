<template>
	<el-row class="container">
		<layout-header></layout-header>
			
		<el-col :span="24" class="main">
			<aside class="menu-expanded">
				<el-menu class="el-menu-vertical-demo">
					<template>
						<el-menu-item index="1">
							<router-link tag="div" to="/adminList" class="tag-list">
								<i class="fa fa-user-circle"></i>
								<span>管理员列表</span>	
							</router-link>
						</el-menu-item>
						<el-submenu index="2">
							<template slot="title">
								<i class="fa fa-sitemap"></i>
								<span>员工信息</span>
							</template>
							<el-menu-item-group>
								<el-menu-item index="2-1">
									<router-link tag="div" to="/staffList" class="tag-list">
										<i class="fa fa-info"></i>
										<span>员工列表</span>
									</router-link>
								</el-menu-item>
								<el-menu-item index="2-2">
									<router-link tag="div" to="/staffChart" class="tag-list">
										<i class="fa fa-joomla"></i>
										<span>员工统计</span>
									</router-link>
								</el-menu-item>
							</el-menu-item-group>
						</el-submenu>
						<el-menu-item index="3">
							<router-link tag="div" to="/myCenter" class="tag-list">
								<i class="fa fa-lock"></i>
								<span>个人中心</span>
							</router-link>
						</el-menu-item>
					</template>
				</el-menu>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>

		
	</el-row>
</template>

<script>
	import Header from '../components/Header'
	export default {
		data() {
			return {
				
			}
		},
		methods: {

		},
		components: {
			'layout-header': Header
		},
		mounted() {
			// var user = sessionStorage.getItem('user');
			// if (user) {
			// 	user = JSON.parse(user);
			// 	this.sysUserName = user.name || '';
			// 	this.sysUserAvatar = user.avatar || '';
			// }
		}
	}

</script>

<style lang="scss">

	$common-color: #409EFF;
	
	.container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		min-width: 1200px;
		.header {
			height: 70px;
			line-height: 70px;
			background-color: $common-color;
			color:#fff;
		}
		.main {
			display: flex;
			position: absolute;
			top: 70px;
			bottom: 0px;
			overflow: hidden;
			background: #fff;
			aside {
				flex:0 0 230px;
				width: 230px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				flex:1;
				overflow-y: auto;
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}

	.menu-expanded {
		float: left;
		height: 100%;
		background-color: #eef1f6;
	}
	.el-menu-item.is-active,
	.el-submenu__title:focus {
		background-color: #eef1f6;
	}

	.el-menu {
		border-right: 0;
		background-color: #eef1f6;
	}
	.el-menu-item:hover,
	.el-submenu__title:hover {
		background-color: #d1dbe5;
	}

	.el-table th {
		background-color: #eef6f6;
		padding: 9px 0;
	}

	.el-table--group, 
	.el-table--border,
	.el-table--border th, 
	.el-table--border td,
	.el-table th.is-leaf, 
	.el-table td {
		border-color: #dfecec;
	}

	.el-table td {
		padding: 8px 0;
	}

	.el-table--enable-row-hover .el-table__body tr:hover > td {
	    background-color: #eef6f6;
	}

	.el-menu-item .fa,
	.el-submenu__title .fa {
		font-size: 18px;
		color: #353535;
		width: 18px;
		text-align: center;
	}

	.el-submenu__icon-arrow {
		font-size: 16px;
	}

	.el-menu-item-group__title {
		padding: 0;
	}

	.el-pager li {
		font-weight: normal;
	}
</style>